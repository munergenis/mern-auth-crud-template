import { RegisterForm } from '@/features/auth/register/RegisterForm';
import type { RegisterUser } from '@/interfaces/User';

export const Register = () => {
  const handleSubmit = (user: RegisterUser) => {
    console.log(user);
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm onUserSubmit={handleSubmit} />
      </div>
    </div>
  );
};
