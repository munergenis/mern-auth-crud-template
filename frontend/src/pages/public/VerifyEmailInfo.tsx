import { TypoLead } from '@/components/typography/TypoLead';
import { TypoMuted } from '@/components/typography/TypoMuted';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const VerifyEmailInfo = () => {
  return (
    <div className="w-full max-w-sm mx-auto my-16 flex flex-col gap-y-8 text-center">
      <TypoLead variant="accent">Verify your email</TypoLead>
      <TypoMuted>
        Check your email to find your Verification Link and follow further
        instructions.
      </TypoMuted>
      <TypoMuted>
        Go back to{' '}
        <Button
          asChild
          variant={'link'}
        >
          <Link to={'/login'}>Login</Link>
        </Button>
      </TypoMuted>
    </div>
  );
};
