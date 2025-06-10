import { NOT_FOUND, OK, UNAUTHORIZED } from '#constants/http.js';
import UserModel from '#models/user.model.js';
import appAssert from '#utils/appAssert.js';
import catchErrors from '#utils/catchErrors.js';

export const getUserHandler = catchErrors(async (req, res) => {
  const userId = req.userId;
  appAssert(userId, UNAUTHORIZED, 'Not Authorized');

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, 'User not found');

  res.status(OK).json(user.omitPassword());
  return;
});
