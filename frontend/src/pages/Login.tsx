import { LoginForm } from '@/features/auth/login/LoginForm';
import type { LoginUser } from '@/features/auth/interfaces/User';
import { useLogin } from '@/features/auth/login/hooks/useLogin';

export const Login = () => {
  const { loginMutation } = useLogin();

  const handleSubmit = (user: LoginUser) => {
    loginMutation.mutate(user);
  };

  return (
    <div className="w-full h-full max-w-sm m-auto">
      <LoginForm
        isPending={loginMutation.isPending}
        onUserSubmit={handleSubmit}
      />
    </div>
  );
};
