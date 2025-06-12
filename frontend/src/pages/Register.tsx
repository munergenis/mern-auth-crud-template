import { RegisterForm } from '@/features/auth/register/RegisterForm';
import type { RegisterUser } from '@/features/auth/interfaces/User';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { register } from '@/api/api';

export const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (user: RegisterUser) => {
    console.log(user);
  };

  const {
    mutate: signUp,
    isPending,
    isError,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm
          isPending={isPending}
          onUserSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
