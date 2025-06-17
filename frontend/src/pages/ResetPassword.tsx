import type { ApiError } from '@/api/lib/ApiError';
import { TypoLead } from '@/components/typography/TypoLead';
import { TypoMuted } from '@/components/typography/TypoMuted';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/features/auth/resetPassword/actions/resetPassword';
import { ResetPasswordForm } from '@/features/auth/resetPassword/ResetPasswordForm';
import type { ResetPasswordFormSchema } from '@/features/auth/resetPassword/schema/resetPasswordFormSchema';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      navigate('/', { replace: true });
    }
  }, [code, navigate]);

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onError: (error: ApiError) => {
      const message =
        error.status && error.status !== 500
          ? error.message
          : 'Something went wrong';
      toast.error(message);
    },
  });

  const handleSubmit = (formData: ResetPasswordFormSchema) => {
    console.log(formData.password);
    console.log(code);
    resetPasswordMutation.mutate({
      password: formData.password,
      verificationCode: code!,
    });
  };

  return (
    <div className="w-full h-full max-w-sm m-auto">
      {!resetPasswordMutation.isSuccess && (
        <ResetPasswordForm
          isPending={resetPasswordMutation.isPending}
          onUserSubmit={handleSubmit}
        />
      )}
      {resetPasswordMutation.isSuccess && (
        <div className="space-y-2">
          <TypoLead
            className="text-center text-pretty"
            variant="accent"
          >
            Password reset successful!
          </TypoLead>
          <TypoMuted className="text-center">
            Go back to{' '}
            <Button
              asChild
              variant={'link'}
            >
              <Link to={'/login'}>Login</Link>
            </Button>
          </TypoMuted>
        </div>
      )}
    </div>
  );
};
