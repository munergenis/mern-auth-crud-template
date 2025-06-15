import type { ApiError } from '@/api/lib/ApiError';
import { TypoLead } from '@/components/typography/TypoLead';
import { TypoMuted } from '@/components/typography/TypoMuted';
import { sendPasswordResetEmail } from '@/features/auth/forgotPassword/actions/sendPasswordResetEmail';
import { ForgotPasswordForm } from '@/features/auth/forgotPassword/components/ForgotPasswordForm';
import type { ResetPasswordData } from '@/features/auth/interfaces/Auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const ForgotPassword = () => {
  const handleSubmit = (data: ResetPasswordData) => {
    forgotPasswordMutation.mutate(data);
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: sendPasswordResetEmail,
    onError: (error: ApiError) => {
      const message =
        error.status && error.status !== 500
          ? error.message
          : 'Something went wrong';
      toast.error(message);
    },
  });

  return (
    <div className="w-full h-full max-w-sm m-auto">
      {!forgotPasswordMutation.isSuccess && (
        <ForgotPasswordForm
          isPending={forgotPasswordMutation.isPending}
          onUserSubmit={handleSubmit}
        />
      )}

      {forgotPasswordMutation.isSuccess && (
        <div className="space-y-2">
          <TypoLead
            className="text-center text-pretty"
            variant="accent"
          >
            Email sent!
          </TypoLead>
          <TypoMuted className="text-center">
            Check your inbox for further instructions.
          </TypoMuted>
        </div>
      )}
    </div>
  );
};
