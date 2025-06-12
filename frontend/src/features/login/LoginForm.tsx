import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import type { LoginUser } from '@/interfaces/User';
import { LoginHeader } from '@/features/login/components/LoginHeader';

interface LoginFormProps {
  onUserSubmit: (loginUser: LoginUser) => void;
}

export const LoginForm = ({
  onUserSubmit,
  className,
  ...props
}: LoginFormProps & React.ComponentProps<'div'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginUser: LoginUser = { email, password };
    onUserSubmit(loginUser);
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <LoginHeader />
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="$welcome123!"
                required
                minLength={6}
                maxLength={100}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

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
    </div>
  );
};
