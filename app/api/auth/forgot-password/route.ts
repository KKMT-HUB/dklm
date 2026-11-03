import { NextResponse } from "next/server";
import { AuthNotConfiguredError } from "@/lib/auth/errors";
import { getAuthProvider } from "@/lib/auth/provider";
import { isSameOrigin } from "@/lib/auth/request";
import { forgotPasswordSchema } from "@/lib/validation/auth";

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

  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) return fail(400, "VALIDATION", "Enter your email or username.");

  try {
    await getAuthProvider().requestPasswordReset(parsed.data.identifier);
    // Same answer whether or not the account exists.
    return NextResponse.json({ ok: true }, { status: 202, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof AuthNotConfiguredError) {
      console.error("[auth]", error.message);
      return fail(503, "AUTH_NOT_CONFIGURED", "Password reset isn't connected yet. Contact your administrator for help.");
    }
    console.error("[auth] password reset failed", error);
    return fail(500, "SERVER_ERROR", "Something went wrong on our side. Try again in a moment.");
  }
}
