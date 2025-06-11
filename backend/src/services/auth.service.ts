import {
  EMAIL_VERIFICATION_CODE_DURATION_DAYS,
  PASSWORD_RESET_EMAIL_RATE_LIMIT,
  PASSWORD_RESET_EMAIL_WINDOW_MINUTES,
  PASSWORD_RESET_VERIFICATION_CODE_DURATION_HOURS,
  SESSION_DURATION_DAYS,
  SESSION_REFRESH_THRESHOLD_HOURS,
} from '#config/appGlobalConfig.js';
import AppErrorCode from '#constants/appErrorCode.js';
import { APP_ORIGIN } from '#constants/env.js';
import {
  CONFLICT,
  // FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from '#constants/http.js';
import VerificationCodeType from '#constants/verificationCodeTypes.js';
import SessionModel, { SessionId } from '#models/session.model.js';
import UserModel, { UserId } from '#models/user.model.js';
import VerificationCodeModel from '#models/verificationCode.model.js';
import appAssert from '#utils/appAssert.js';
import { hashValue } from '#utils/bcrypt.js';
import { daysFromNow, hoursFromNow, hoursInMs, minutesAgo } from '#utils/date.js';
import { getPasswordResetTemplate, getVerifyEmailTemplate } from '#utils/emailTemplates.js';
import { RefreshTokenPayload, refreshTokenSignOptions, signToken, verifyToken } from '#utils/jwt.js';
import { sendMail } from '#utils/sendMail.js';

export interface CreateAccountParams {
  email: string;
  password: string;
  userAgent?: string;
}

export const createAccount = async (data: CreateAccountParams) => {
  // verify user doesn't exist (by email)
  const existingUser = await UserModel.exists({ email: data.email });
  appAssert(!existingUser, CONFLICT, 'User already exists');

  // create user
  const user = await UserModel.create({ email: data.email, password: data.password });
  const userId = user._id as UserId;

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    expiresAt: daysFromNow(EMAIL_VERIFICATION_CODE_DURATION_DAYS),
    type: VerificationCodeType.EmailVerification,
    userId,
  });

  // send verification email
  const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;
  const { error } = await sendMail({
    ...getVerifyEmailTemplate(url),
    to: user.email,
  });
  if (error) console.error(error);

  // create session
  const session = await SessionModel.create({ userAgent: data.userAgent, userId });
  const sessionId = session._id as SessionId;

  // sign access token & refresh token
  const refreshTokenPayload = { sessionId };
  const refreshToken = signToken(refreshTokenPayload, refreshTokenSignOptions);

  const accessTokenPayload = { sessionId, userId };
  const accessToken = signToken(accessTokenPayload);

  // return user & tokens
  return { accessToken, refreshToken, user: user.omitPassword() };
};

export interface LoginUserParams {
  email: string;
  password: string;
  userAgent?: string;
}

export const loginUser = async (data: LoginUserParams) => {
  // get user by email
  const user = await UserModel.findOne({ email: data.email });
  appAssert(user, UNAUTHORIZED, 'Invalid email or password');
  const userId = user._id as UserId;

  // validate password from the request
  const isValid = await user.comparePassword(data.password);
  appAssert(isValid, UNAUTHORIZED, 'Invalid email or password');

  // validate is verified
  // TODO: (extracting globalconfig FORCE_VERIFIED see notes.ignore.md)
  // appAssert(user.verified, FORBIDDEN, 'User is not verified');

  // create session
  const session = await SessionModel.create({ userAgent: data.userAgent, userId });
  const sessionId = session._id as SessionId;

  // sign access token & refresh token
  const refreshTokenPayload = { sessionId };
  const refreshToken = signToken(refreshTokenPayload, refreshTokenSignOptions);

  const accessTokenPayload = { sessionId, userId };
  const accessToken = signToken(accessTokenPayload);

  // return user & tokens
  return { accessToken, refreshToken, user: user.omitPassword() };
};

export const refreshUserAccesssToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, { secret: refreshTokenSignOptions.secret });
  appAssert(payload, UNAUTHORIZED, 'Invalid Refresh Token', AppErrorCode.InvalidRefreshToken);

  const session = await SessionModel.findById(payload.sessionId);
  appAssert(session && session.expiresAt.getTime() > Date.now(), UNAUTHORIZED, 'Session expired');

  // refresh session if it expires in the SESSION_REFRESH_THRESHOLD from globalconfig
  const sessionNeedsRefresh = session.expiresAt.getTime() - Date.now() <= hoursInMs(SESSION_REFRESH_THRESHOLD_HOURS);
  if (sessionNeedsRefresh) {
    session.expiresAt = daysFromNow(SESSION_DURATION_DAYS);
    await session.save();
  }

  const newRefreshToken = sessionNeedsRefresh ? signToken(payload, refreshTokenSignOptions) : undefined;

  const accessTokenPayload = { sessionId: payload.sessionId, userId: session.userId };
  const accessToken = signToken(accessTokenPayload);

  return { accessToken, newRefreshToken };
};

export const verifyEmail = async (code: string) => {
  // get and verify the verification code
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    expiresAt: { $gt: new Date() },
    type: VerificationCodeType.EmailVerification,
  });
  appAssert(validCode, NOT_FOUND, 'Invalid or expired verification code');

  // update user to verified true
  const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId, { verified: true }, { new: true });
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, 'Failed to verify email');

  // delete verification code
  await validCode.deleteOne();

  // return user
  return { user: updatedUser.omitPassword() };
};

export const sendPasswordResetEmail = async (email: string) => {
  // get user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, NOT_FOUND, 'User not found');

  // check email rate limit

  const timeAgo = minutesAgo(PASSWORD_RESET_EMAIL_WINDOW_MINUTES);
  const count = await VerificationCodeModel.countDocuments({
    createdAt: { $gt: timeAgo },
    type: VerificationCodeType.PasswordReset,
    userId: user._id,
  });
  appAssert(count < PASSWORD_RESET_EMAIL_RATE_LIMIT, TOO_MANY_REQUESTS, 'Too many requests, please try again later');

  // create verification code
  const expiresAt = hoursFromNow(PASSWORD_RESET_VERIFICATION_CODE_DURATION_HOURS);
  const verificationCode = await VerificationCodeModel.create({
    expiresAt,
    type: VerificationCodeType.PasswordReset,
    userId: user._id,
  });

  // send verification email
  const url = `${APP_ORIGIN}/auth/password/reset?code=${verificationCode._id}&exp=${expiresAt.getTime()}`;
  const { data, error } = await sendMail({
    ...getPasswordResetTemplate(url),
    to: user.email,
  });
  appAssert(data?.id, INTERNAL_SERVER_ERROR, `${error?.name} - ${error?.message}`);

  // return success
  return {
    emailId: data.id,
    url,
  };
};

interface ResetPasswordParams {
  password: string;
  verificationCode: string;
}

export const resetPassword = async (data: ResetPasswordParams) => {
  // get verification code document
  const verificationCode = await VerificationCodeModel.findOne({
    _id: data.verificationCode,
    expiresAt: { $gt: new Date() },
    type: VerificationCodeType.PasswordReset,
  });
  appAssert(verificationCode, NOT_FOUND, 'Invalid verification code');

  // update user's password
  const user = await UserModel.findByIdAndUpdate(
    verificationCode.userId,
    {
      password: await hashValue(data.password),
    },
    { new: true },
  );
  appAssert(user, INTERNAL_SERVER_ERROR, 'Failed to reset password');

  // delete verification code
  await verificationCode.deleteOne();

  // delete all sessions
  await SessionModel.deleteMany({ userId: user._id });

  // return success
  return { user: user.omitPassword() };
};
