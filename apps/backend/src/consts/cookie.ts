import { CookieOptions } from '@fastify/session';
import ms from 'ms';

import { envVariables } from '../utils/envVariables.js';

export const cookie: CookieOptions = {
  httpOnly: true,
  maxAge: ms('2 days'),
  sameSite: envVariables.PRODUCTION === 'true' ? 'none' : 'strict',
  secure: envVariables.PRODUCTION === 'true' ? true : false,
};
