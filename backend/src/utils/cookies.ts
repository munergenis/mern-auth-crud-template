import { CookieOptions, Response } from 'express';

import { fifteenMinutesFromNow, thirtyDaysFromNow } from './date.js';

export const REFRESH_PATH = '/auth/refresh';
const enum TOKEN_KEYS {
  ACCESS_TOKEN_KEY = 'accessToken',
  REFRESH_TOKEN_KEY = 'refreshToken',
}

const secure = process.env.NODE_ENV !== 'development';

const defaults: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure,
};

export const getAccesssTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});
export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});

interface Params {
  [TOKEN_KEYS.ACCESS_TOKEN_KEY]: string;
  [TOKEN_KEYS.REFRESH_TOKEN_KEY]: string;
  res: Response;
}

export const setAuthCookies = ({ accessToken, refreshToken, res }: Params) => {
  return res
    .cookie(TOKEN_KEYS.ACCESS_TOKEN_KEY, accessToken, getAccesssTokenCookieOptions())
    .cookie(TOKEN_KEYS.REFRESH_TOKEN_KEY, refreshToken, getRefreshTokenCookieOptions());
};

export const clearAuthCookies = (res: Response) => {
  return res.clearCookie(TOKEN_KEYS.ACCESS_TOKEN_KEY).clearCookie(TOKEN_KEYS.REFRESH_TOKEN_KEY, { path: REFRESH_PATH });
};

export const setRefreshCookie = ({ refreshToken, res }: Omit<Params, TOKEN_KEYS.ACCESS_TOKEN_KEY>) => {
  return res.cookie(TOKEN_KEYS.REFRESH_TOKEN_KEY, refreshToken, getRefreshTokenCookieOptions());
};

export const setAccessCookie = ({ accessToken, res }: Omit<Params, TOKEN_KEYS.REFRESH_TOKEN_KEY>) => {
  return res.cookie(TOKEN_KEYS.ACCESS_TOKEN_KEY, accessToken, getAccesssTokenCookieOptions());
};
