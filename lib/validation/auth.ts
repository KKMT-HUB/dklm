import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Enter your email or username.")
    .max(254, "That is too long. Check your email or username."),
  password: z
    .string()
    .min(1, "Enter your password.")
    .max(256, "That password is too long."),
  remember: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Enter your email or username.")
    .max(254, "That is too long. Check your email or username."),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
