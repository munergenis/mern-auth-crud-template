import { SessionId } from '#models/session.model.ts';
import { UserId } from '#models/user.model.ts';

declare global {
  namespace Express {
    interface Request {
      sessionId: SessionId | undefined;
      userId: undefined | UserId;
    }
  }
}

export {};
