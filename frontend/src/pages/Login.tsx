import { login } from '@/api/api';
import { LoginForm } from '@/features/auth/login/LoginForm';
import type { LoginUser } from '@/features/auth/interfaces/User';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (user: LoginUser) => {
    console.log(user);
  };

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/dashboard', { replace: true });
    },
  });

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
