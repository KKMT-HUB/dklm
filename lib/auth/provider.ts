import "server-only";
import type { AuthProvider } from "@/types/auth";
import { createDevAuthProvider } from "./dev-provider";
import { AuthNotConfiguredError } from "./errors";

/**
 * ============================  AUTH INTEGRATION POINT  ============================
 * This is the one place to connect real authentication.
 *
 * 1. Write an object that implements `AuthProvider` (see types/auth.ts). It should:
 *      - verify the password against hashed storage (argon2 / bcrypt), never plain text
 *      - return { id, name, role, institutionId } for a valid user, or null otherwise
 *      - start a password reset without revealing whether the account exists
 * 2. Return it from `getAuthProvider()` below.
 * 3. Set AUTH_SECRET so the session cookie can be signed.
 *
 * Until then, sign-in answers "not connected" instead of pretending to succeed.
 * ==================================================================================
 */
const notConfigured: AuthProvider = {
  async authenticate() {
    throw new AuthNotConfiguredError("No auth provider is connected. See lib/auth/provider.ts.");
  },
  async requestPasswordReset() {
    throw new AuthNotConfiguredError("No auth provider is connected. See lib/auth/provider.ts.");
  },
};

export function getAuthProvider(): AuthProvider {
  // return myRealProvider;
  return createDevAuthProvider() ?? notConfigured;
}
