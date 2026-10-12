import { SignJWT, jwtVerify } from "jose";
import { ROLES, type Role, type SessionUser } from "@/types/auth";
import { AuthNotConfiguredError } from "./errors";

// Edge/proxy-safe: no Node-only or next/headers imports in this file.

function getKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new AuthNotConfiguredError("AUTH_SECRET must be set to at least 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(user: SessionUser, ttlSeconds: number) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({
    name: user.name,
    role: user.role,
    institutionId: user.institutionId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt(now)
    .setExpirationTime(now + ttlSeconds)
    .sign(getKey());
}

export async function verifySession(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ["HS256"] });
    const role = payload.role as Role;
    if (!payload.sub || typeof payload.name !== "string" || !ROLES.includes(role)) return null;
    return {
      id: payload.sub,
      name: payload.name,
      role,
      institutionId: typeof payload.institutionId === "string" ? payload.institutionId : undefined,
    };
  } catch {
    // Missing secret, bad signature, expired token: all mean "not signed in".
    return null;
  }
}
