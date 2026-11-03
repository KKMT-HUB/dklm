import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Role, SessionUser } from "@/types/auth";
import { REMEMBER_TTL_SECONDS, SESSION_COOKIE, SESSION_TTL_SECONDS } from "./config";
import { signSession, verifySession } from "./token";

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

/**
 * Use at the top of every private layout/page (the proxy is only the first gate).
 * Redirects to /login when signed out, and to /dashboard when the role is not allowed.
 */
export async function requireSession(allowedRoles?: readonly Role[]): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect("/login");
  if (allowedRoles && !allowedRoles.includes(session.role)) redirect("/dashboard");
  return session;
}

export async function setSessionCookie(user: SessionUser, remember: boolean) {
  const ttl = remember ? REMEMBER_TTL_SECONDS : SESSION_TTL_SECONDS;
  const token = await signSession(user, ttl);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Without maxAge the cookie ends with the browser session.
    ...(remember ? { maxAge: REMEMBER_TTL_SECONDS } : {}),
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
