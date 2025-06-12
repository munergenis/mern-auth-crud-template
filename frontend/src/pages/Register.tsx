import { RegisterForm } from '@/features/auth/register/RegisterForm';
import type { RegisterUser } from '@/features/auth/interfaces/User';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { register } from '@/api/api';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (user: RegisterUser) => {
    signUp(user);
  };

  const {
    mutate: signUp,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: register,
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
        <RegisterForm
          isPending={isPending}
          onUserSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
