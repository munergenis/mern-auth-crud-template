import z from 'zod';

export const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z.string().min(6).max(255);
const userAgentSchema = z.string().optional();
export const verificationCodeSchema = z.string().min(1).max(24);

export const registerSchema = z
  .object({
    confirmPassword: z.string().min(6).max(255),
    email: emailSchema,
    password: passwordSchema,
    userAgent: userAgentSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: userAgentSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});
