export const ROLES = ["super_admin", "institution_admin", "teacher", "student"] as const;

export type Role = (typeof ROLES)[number];

export interface SessionUser {
  id: string;
  name: string;
  role: Role;
  /** Set for every role except super_admin. Use it to scope all data queries. */
  institutionId?: string;
}

export interface Credentials {
  identifier: string;
  password: string;
}

/**
 * The single integration point for authentication.
 * Implement this interface against your identity backend (database, Auth.js,
 * Keycloak, Supabase, a school ERP, ...) and return it from `getAuthProvider()`
 * in `lib/auth/provider.ts`.
 */
export interface AuthProvider {
  /** Return the user when the credentials are valid, or `null` when they are not. */
  authenticate(credentials: Credentials): Promise<SessionUser | null>;
  /** Start a password reset. Must not reveal whether the account exists. */
  requestPasswordReset(identifier: string): Promise<void>;
}
