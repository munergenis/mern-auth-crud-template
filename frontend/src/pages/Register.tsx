import { RegisterForm } from '@/features/auth/register/RegisterForm';
import type { RegisterUser } from '@/features/auth/interfaces/User';
import { useRegister } from '@/features/auth/register/hooks/useRegister';

export const Register = () => {
  const { registerMutation } = useRegister();

  const handleSubmit = (user: RegisterUser) => {
    registerMutation.mutate(user);
  };

  return (
    <div className="w-full h-full max-w-sm m-auto">
      <RegisterForm
        isPending={registerMutation.isPending}
        onUserSubmit={handleSubmit}
      />
    </div>
  );
};
