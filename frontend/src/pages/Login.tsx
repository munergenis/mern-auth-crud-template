import { login } from '@/api/api';
import { LoginForm } from '@/features/auth/login/LoginForm';
import type { LoginUser } from '@/features/auth/interfaces/User';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (user: LoginUser) => {
    signIn(user);
  };

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error('Error login');
    }
  }, [isError]);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          isPending={isPending}
          onUserSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
