import cookie from 'cookie';
import ms from 'ms';
import { NextApiRequest, NextApiResponse } from 'next';

const googleAuthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = req.cookies.sessionId || '';

  return res
    .setHeader(
      'Set-Cookie',
      cookie.serialize('sessionId', sessionCookie, {
        httpOnly: true,
        maxAge: ms('7 days'),
        sameSite: 'lax',
        secure: true,
        path: '/',
      }),
    )
    .redirect('/');
};

export default googleAuthHandler;
