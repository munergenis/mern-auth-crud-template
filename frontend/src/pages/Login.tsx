import { LoginForm } from '@/features/login/LoginForm';
import type { LoginUser } from '@/interfaces/User';

export const Login = () => {
  const handleSubmit = (user: LoginUser) => {
    console.log(user);
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onUserSubmit={handleSubmit} />
      </div>
    </div>
  );
};
