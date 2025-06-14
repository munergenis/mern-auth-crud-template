import { login } from '@/api/api';
import type { ApiError } from '@/api/lib/ApiError';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
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

  return { loginMutation };
};
