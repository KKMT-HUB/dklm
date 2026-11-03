import { NextResponse } from "next/server";
import { AuthNotConfiguredError } from "@/lib/auth/errors";
import { getAuthProvider } from "@/lib/auth/provider";
import { isSameOrigin } from "@/lib/auth/request";
import { setSessionCookie } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation/auth";

export const dynamic = "force-dynamic";

function fail(status: number, code: string, message: string) {
  return NextResponse.json({ ok: false, code, message }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return fail(403, "BAD_ORIGIN", "This request was blocked. Reload the page and try again.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "BAD_REQUEST", "We couldn't read that request. Reload the page and try again.");
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return fail(400, "VALIDATION", "Enter your email or username and your password.");

  try {
    const { identifier, password, remember } = parsed.data;
    const user = await getAuthProvider().authenticate({ identifier, password });
    if (!user) return fail(401, "INVALID_CREDENTIALS", "The email, username or password is incorrect.");

    await setSessionCookie(user, remember);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof AuthNotConfiguredError) {
      console.error("[auth]", error.message);
      return fail(503, "AUTH_NOT_CONFIGURED", "Sign-in isn't connected yet. Ask your administrator to finish setting up authentication.");
    }
    console.error("[auth] login failed", error);
    return fail(500, "SERVER_ERROR", "Something went wrong on our side. Try again in a moment.");
  }
}
