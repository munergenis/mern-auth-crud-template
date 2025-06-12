import z from 'zod';

export const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z.string().min(6).max(255);

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export default loginFormSchema;
