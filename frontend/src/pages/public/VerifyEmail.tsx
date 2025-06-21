import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { verifyEmail } from '@/features/auth/verifyEmail/actions/verifyEmail';
import { EmailVerified } from '@/features/auth/verifyEmail/components/EmailVerified';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

export const VerifyEmail = () => {
  const { code } = useRouterParams('code');

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code),
  });

  return (
    <div className="w-full max-w-sm mx-auto my-16 flex flex-col gap-y-8">
      {isPending && <Loader />}
      {isSuccess && <EmailVerified />}
      {isError && (
        <ErrorMessage
          title="Invalid link"
          description="The link is either invalid or expired."
          linkLabel="Register again"
          linkPath="/register"
        />
      )}

      {(isError || isSuccess) && (
        <Button asChild>
          <Link
            to="/"
            replace
          >
            Back Home
          </Link>
        </Button>
      )}
    </div>
  );
};
