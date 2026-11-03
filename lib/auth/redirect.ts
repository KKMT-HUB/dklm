/** Only allow redirects to private pages inside this app. Blocks open-redirect attempts. */
export function safeRedirectPath(input: string | null | undefined, fallback = "/dashboard") {
  if (typeof input !== "string") return fallback;
  if (!input.startsWith("/dashboard")) return fallback;
  if (input.startsWith("//") || input.includes("\\")) return fallback;
  return input;
}
