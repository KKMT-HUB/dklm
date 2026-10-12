import { createHash, timingSafeEqual } from "node:crypto";
import { ROLES, type AuthProvider, type Role } from "@/types/auth";
import { AuthNotConfiguredError } from "./errors";

/**
 * Development-only provider so you can exercise the dashboard locally.
 * It checks a real credential pair from your environment and is disabled in production.
 * It is NOT a replacement for a real auth backend.
 */
function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string) {
  return timingSafeEqual(digest(a), digest(b));
}

export function createDevAuthProvider(): AuthProvider | null {
  if (process.env.NODE_ENV === "production") return null;

  const identifier = process.env.DEV_AUTH_IDENTIFIER;
  const password = process.env.DEV_AUTH_PASSWORD;
  if (!identifier || !password) return null;

  const requestedRole = process.env.DEV_AUTH_ROLE as Role | undefined;
  const role: Role = requestedRole && ROLES.includes(requestedRole) ? requestedRole : "institution_admin";

  return {
    async authenticate(credentials) {
      const identifierOk = safeEqual(credentials.identifier.toLowerCase(), identifier.toLowerCase());
      const passwordOk = safeEqual(credentials.password, password);
      if (!(identifierOk && passwordOk)) return null;
      return { id: "dev-user", name: "Development user", role, institutionId: role === "super_admin" ? undefined : "dev-institution" };
    },
    async requestPasswordReset() {
      throw new AuthNotConfiguredError("Password reset is not connected.");
    },
  };
}
