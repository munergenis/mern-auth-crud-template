import VerificationCodeType from '#constants/verificationCodeTypes.js';
import mongoose from 'mongoose';

export interface VerificationCodeDocument extends mongoose.Document {
  createdAt: Date;
  expiresAt: Date;
  type: VerificationCodeType;
  userId: mongoose.Types.ObjectId;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  createdAt: { default: Date.now, required: true, type: Date },
  expiresAt: { required: true, type: Date },
  type: { required: true, type: String },
  userId: { index: true, ref: 'User', required: true, type: mongoose.Schema.Types.ObjectId },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  'VerificationCode',
  verificationCodeSchema,
  'verification_codes',
);
export default VerificationCodeModel;
