import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSession } from '../actions/deleteSession';
import { SESSIONS_KEY } from './useSessions';
import type { Session } from '../../interfaces/Auth';

export const useDeleteSession = (sessionId: string) => {
  const queryClient = useQueryClient();

  const { data, mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () =>
      queryClient.setQueryData([SESSIONS_KEY], (old: Session[]) =>
        old.filter((session) => session._id !== sessionId)
      ),
  });

  const deleteSessionMutation = { message: data, delete: mutate, ...rest };

  return { deleteSessionMutation };
};
