import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterHeader } from '@/features/auth/register/components/RegisterHeader';
import type { RegisterUser } from '@/features/auth/interfaces/User';
import { useForm } from 'react-hook-form';
import registerFormSchema, {
  type RegisterFormSchema,
} from './schema/RegisterFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface RegisterFormProps {
  isPending: boolean;
  onUserSubmit: (registerUser: RegisterUser) => void;
  className?: string;
}

export const RegisterForm = ({
  isPending,
  onUserSubmit,
  className,
  ...props
}: RegisterFormProps & React.ComponentProps<'div'>) => {
  const form = useForm<RegisterFormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const isSubmitButtonDisabled = !form.formState.isValid || isPending;

  const onSubmit = (registerUser: RegisterFormSchema) => {
    onUserSubmit(registerUser);
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <RegisterHeader />

            <div className="flex flex-col gap-6">
              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="$welcome123!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* CONFIRM PASSWORD */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="$welcome123!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitButtonDisabled}
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
