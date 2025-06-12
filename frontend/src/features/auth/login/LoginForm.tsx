import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';
import type { LoginUser } from '@/interfaces/User';
import { LoginHeader } from '@/features/auth/login/components/LoginHeader';
import { useForm } from 'react-hook-form';
import loginFormSchema, {
  type LoginFormSchema,
} from './schema/LoginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface LoginFormProps {
  onUserSubmit: (loginUser: LoginUser) => void;
}

export const LoginForm = ({
  onUserSubmit,
  className,
  ...props
}: LoginFormProps & React.ComponentProps<'div'>) => {
  const form = useForm<LoginFormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (loginUser: LoginFormSchema) => {
    onUserSubmit(loginUser);
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <LoginHeader />
            <div className="flex flex-col gap-6">
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

              <Button
                type="submit"
                className="w-full"
              >
                Login
              </Button>
              <Link
                to={'/password/forgot'}
                className={buttonVariants({ variant: 'link', size: 'default' })}
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
