"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { loginSchema, type LoginInput } from "@/lib/validation/auth";
import { FormStatus, type FormStatusState } from "./form-status";

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<FormStatusState>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "", remember: false },
  });

  const redirecting = status.kind === "success";

  async function onSubmit(values: LoginInput) {
    setStatus({ kind: "idle" });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setStatus({ kind: "error", message: data?.message ?? "We couldn't sign you in. Try again." });
        return;
      }

      setStatus({ kind: "success", message: "Signed in. Taking you to your dashboard…" });
      router.replace(next);
      router.refresh();
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
          placeholder="name@example.com"
          aria-invalid={errors.identifier ? true : undefined}
          aria-describedby={errors.identifier ? "identifier-error" : undefined}
          {...register("identifier")}
        />
      </Field>

      <Field id="password" label="Password" error={errors.password?.message}>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="pr-12"
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-primary-50 hover:text-primary-800"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
      </Field>

      <div className="flex items-center justify-between gap-4">
        <label htmlFor="remember" className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-700">
          <input id="remember" type="checkbox" className="size-4 rounded border-line accent-primary-700" {...register("remember")} />
          Remember me
        </label>
        <Link href="/forgot-password" className="rounded text-sm font-medium text-primary-700 underline-offset-4 hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || redirecting}>
        {isSubmitting || redirecting ? (
          <>
            <Loader2 className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            {redirecting ? "Redirecting…" : "Signing in…"}
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
