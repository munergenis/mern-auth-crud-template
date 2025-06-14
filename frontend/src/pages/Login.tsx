import { LoginForm } from '@/features/auth/login/LoginForm';
import type { LoginUser } from '@/features/auth/interfaces/User';
import { useLogin } from '@/features/auth/login/hooks/useLogin';

export const Login = () => {
  const { loginMutation } = useLogin();

  const handleSubmit = (user: LoginUser) => {
    loginMutation.mutate(user);
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          isPending={loginMutation.isPending}
          onUserSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
