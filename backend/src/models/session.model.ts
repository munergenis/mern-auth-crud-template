import { thirtyDaysFromNow } from '#utils/date.js';
import mongoose from 'mongoose';

export interface SessionDocument extends mongoose.Document {
  createdAt: Date;
  expiresAt: Date;
  userAgent?: string;
  userId: mongoose.Types.ObjectId;
}

export type SessionId = mongoose.Types.ObjectId;

export type UserSessionObject = Partial<SessionDocument> & { isCurrent?: boolean };

const sessionSchema = new mongoose.Schema<SessionDocument>({
  createdAt: { default: Date.now, required: true, type: Date },
  expiresAt: { default: thirtyDaysFromNow, required: true, type: Date },
  userAgent: { type: String },
  userId: { index: true, ref: 'User', type: mongoose.Schema.Types.ObjectId },
});

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);
export default SessionModel;
