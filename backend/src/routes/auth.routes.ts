import { NODE_ENV } from '#constants/env.js';
import { FORBIDDEN } from '#constants/http.js';
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  sendPasswordResetHandler,
  verifyEmailHandler,
} from '#controllers/auth.controller.js';
import SessionModel from '#models/session.model.js';
import UserModel from '#models/user.model.js';
import VerificationCodeModel from '#models/verificationCode.model.js';
import appAssert from '#utils/appAssert.js';
import catchErrors from '#utils/catchErrors.js';
import { Router } from 'express';

const authRoutes = Router();

// prefix: /auth
authRoutes.post('/register', registerHandler);
authRoutes.post('/login', loginHandler);
authRoutes.get('/refresh', refreshHandler);
authRoutes.get('/logout', logoutHandler);
authRoutes.get('/email/verify/:code', verifyEmailHandler);
authRoutes.post('/password/forgot', sendPasswordResetHandler);
authRoutes.post('/password/reset', resetPasswordHandler);

// TODO: Delete after testing
authRoutes.delete(
  '/sessions',
  catchErrors(async (req, res) => {
    appAssert(NODE_ENV === 'development', FORBIDDEN, 'Can not perform this action outside dev environment');
    await SessionModel.deleteMany({});
    res.status(200).json({ message: 'Deleted all sessions' });
    return;
  }),
);
authRoutes.delete(
  '/users',
  catchErrors(async (req, res) => {
    appAssert(NODE_ENV === 'development', FORBIDDEN, 'Can not perform this action outside dev environment');
    await UserModel.deleteMany({});
    res.status(200).json({ message: 'Deleted all users' });
    return;
  }),
);
authRoutes.delete(
  '/verification',
  catchErrors(async (req, res) => {
    appAssert(NODE_ENV === 'development', FORBIDDEN, 'Can not perform this action outside dev environment');
    await VerificationCodeModel.deleteMany({});
    res.status(200).json({ message: 'Deleted all verification codes' });
    return;
  }),
);
authRoutes.delete(
  '/destroy',
  catchErrors(async (req, res) => {
    appAssert(NODE_ENV === 'development', FORBIDDEN, 'Can not perform this action outside dev environment');
    await SessionModel.deleteMany({});
    await UserModel.deleteMany({});
    await VerificationCodeModel.deleteMany({});
    res.status(200).json({ message: 'Destroyed all db content successfully' });
    return;
  }),
);

export default authRoutes;
