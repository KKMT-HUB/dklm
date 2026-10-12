# Muallim Web

Landing page, sign-in portal and role-ready dashboard for Islamic educational institutions.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide · React Hook Form + Zod · jose (signed session cookie)

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local      # then fill in the values (see below)
npm run dev                     # http://localhost:3000
```

Other commands: `npm run build`, `npm start`, `npm run typecheck`.

### Environment

| Variable | Purpose |
| --- | --- |
| `AUTH_SECRET` | Signs the session cookie. At least 32 characters. `openssl rand -base64 48` |
| `DEV_AUTH_IDENTIFIER`, `DEV_AUTH_PASSWORD`, `DEV_AUTH_ROLE` | Optional, development only. Lets you sign in locally to see the dashboard. Ignored when `NODE_ENV=production`. |

Without a connected provider, **Sign In reports that authentication isn't connected** instead of pretending to succeed.

To try the dashboard locally, set `AUTH_SECRET` plus the three `DEV_AUTH_*` values, restart the dev server, and sign in with them.

## Routes

| Route | Access |
| --- | --- |
| `/` | Public landing page |
| `/login`, `/forgot-password` | Public. `/login` redirects to the dashboard when already signed in |
| `/privacy`, `/terms` | Public placeholders: replace the text |
| `/dashboard` and `/dashboard/{students,teachers,attendance,examinations,reports,settings}` | Signed-in users only, filtered by role |

## Connecting real authentication

Everything goes through one interface, `AuthProvider` in `types/auth.ts`:

```ts
interface AuthProvider {
  authenticate(credentials: { identifier: string; password: string }): Promise<SessionUser | null>;
  requestPasswordReset(identifier: string): Promise<void>;
}
```

1. Implement it against your user store (database, Auth.js, Keycloak, Supabase, a school ERP...). Verify passwords against hashes (argon2 or bcrypt). Return `{ id, name, role, institutionId }`, or `null` for bad credentials.
2. Return your provider from `getAuthProvider()` in **`lib/auth/provider.ts`**.
3. Set `AUTH_SECRET`.

That is all the login form, API routes, session cookie and route protection need.

### How private routes are protected

- `proxy.ts` redirects signed-out visitors away from `/dashboard/*` (first gate).
- `app/dashboard/layout.tsx` and every dashboard page call `requireSession(roles)` on the server, so access never depends on the proxy alone.
- Role access per module lives in `lib/roles.ts`. The defaults are a starting point; adjust them to your policy.
- The session is an HTTP-only, `SameSite=Lax` signed cookie (12 hours, or 30 days with "Remember me"). It is `Secure` in production.
- Dashboard responses are sent with `Cache-Control: private, no-store`.

> **Next.js 15 or older:** rename `proxy.ts` to `middleware.ts` and the exported function `proxy` to `middleware`.

### Before going live

- Add rate limiting and lockout on `/api/auth/login` and `/api/auth/forgot-password`.
- Scope every data query by `institutionId` from the session.
- Replace the placeholder contact details in `lib/site.ts` and the legal text in `app/privacy` and `app/terms`.

## Project structure

```
app/                  Routes, layouts, API routes (auth), error and not-found pages
components/layout/    Navbar, footer, legal page wrapper
components/sections/  Hero, about, services, benefits, call to action
components/auth/      Auth shell, login form, forgot-password form
components/dashboard/ Dashboard shell, module icons, module placeholder
components/ui/        Button, field/input, logo, Islamic pattern, reveal animation
lib/                  Content, navigation, roles, validation, auth (provider, session, token)
types/                Shared types (roles, session user, AuthProvider)
proxy.ts              Route gate for /dashboard and /login
```

## Design notes

- Palette: deep emerald (primary), teal (secondary), soft gold (accent), warm white background, deep charcoal text. Tokens live in `app/globals.css`.
- Fonts: Bricolage Grotesque (headings), Figtree (body). Noto Naskh Arabic and Noto Sans Malayalam are wired in as fallbacks and load only when those scripts appear on a page. Use `font-arabic` / `font-malayalam` and `dir="rtl"` where needed.
- Motion: the hero has one orchestrated entrance, a slow background drift and floating stars. Other animation is hover- and scroll-triggered. Reduced-motion preferences are respected (Motion's `reducedMotion="user"` plus CSS media queries).
- Hero numbers in the dashboard preview are sample data and labelled as such.
