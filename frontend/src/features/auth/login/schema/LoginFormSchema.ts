import z from 'zod';
import { emailSchema, passwordSchema } from '../../schemas';

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export default loginFormSchema;
