import { register } from '@/api/api';
import type { ApiError } from '@/api/lib/ApiError';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useRegister = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/dashboard', { replace: true });
    },
    onError: (error: ApiError) => {
      const message =
        error.status && error.status !== 500
          ? error.message
          : 'Something went wrong';
      toast.error(message);
    },
  });

  return { registerMutation, registerUser: registerMutation.mutate };
};
