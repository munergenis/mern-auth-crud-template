import { GalleryVerticalEnd } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';

interface UserFormProps {
  type?: 'register' | 'login';
}

export const UserForm = ({
  type = 'login',
  className,
  ...props
}: UserFormProps & React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">
              {/* TODO: delete or abstract */}
              {/* Inicia sessió / Accedeix || Registra't */}
              {type === 'login' ? 'Log in to' : 'Sign up for'} Acme Inc.
            </h1>
            {type === 'login' ? (
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="$welcome123!"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
            >
              {type === 'login' ? 'Login' : 'Register'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
