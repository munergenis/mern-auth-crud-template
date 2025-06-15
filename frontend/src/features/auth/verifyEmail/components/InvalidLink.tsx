import { TypoLead } from '@/components/typography/TypoLead';
import { TypoMuted } from '@/components/typography/TypoMuted';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const InvalidLink = () => {
  return (
    <div className="flex flex-col gap-4">
      <TypoLead
        className="text-center"
        variant="destructive"
      >
        Invalid link
      </TypoLead>

      <div className="flex items-center justify-center">
        <TypoMuted>The link is either invalid or expired.</TypoMuted>

        <Button
          variant={'link'}
          asChild
        >
          <Link
            to={'/register'}
            replace
          >
            Register again
          </Link>
        </Button>
      </div>
    </div>
  );
};
