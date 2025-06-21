import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Session } from '../../interfaces/Auth';
import { parseUserAgent } from '@/shared/utils/parseUserAgent';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LOCALE } from '@/config/appConfig';
import { Loader } from '@/components/Loader/Loader';
import { useDeleteSession } from '../hooks/useDeleteSession';

interface SessionCardProps {
  session: Session;
}

export const SessionCard = ({ session }: SessionCardProps) => {
  const { deviceType, os, browser } = parseUserAgent(session.userAgent);
  const { deleteSessionMutation } = useDeleteSession(session._id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{deviceType}</CardTitle>

        <CardDescription>
          {os} | {browser}
        </CardDescription>

        <CardDescription>
          {new Date(session.createdAt).toLocaleDateString(LOCALE)}
        </CardDescription>

        {!session.isCurrent ? (
          <CardAction>
            {deleteSessionMutation.isPending ? (
              <Loader />
            ) : (
              <Button
                variant={'destructive'}
                onClick={() => deleteSessionMutation.delete()}
              >
                Delete
              </Button>
            )}
          </CardAction>
        ) : (
          <CardAction>
            <div className="flex items-center gap-x-2 text-sm text-accent-foreground italic">
              <CheckCircle2
                color="green"
                size={16}
              />
              current session
            </div>
          </CardAction>
        )}
      </CardHeader>
    </Card>
  );
};
