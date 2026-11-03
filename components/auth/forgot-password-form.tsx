"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validation/auth";
import { FormStatus, type FormStatusState } from "./form-status";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<FormStatusState>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: "" },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    setStatus({ kind: "idle" });
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setStatus({ kind: "error", message: data?.message ?? "We couldn't send reset instructions. Try again." });
        return;
      }
      setStatus({ kind: "success", message: "If an account matches, reset instructions are on their way." });
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting} className="space-y-5">
      <FormStatus status={status} />

      <Field id="identifier" label="Email or username" error={errors.identifier?.message}>
        <Input
          id="identifier"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={errors.identifier ? true : undefined}
          aria-describedby={errors.identifier ? "identifier-error" : undefined}
          {...register("identifier")}
        />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send reset instructions"
        )}
      </Button>

      <p className="text-center text-sm text-ink-600">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-primary-700 underline-offset-4 hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
