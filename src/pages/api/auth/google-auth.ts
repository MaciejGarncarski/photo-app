import { setCookie } from 'cookies-next';
import ms from 'ms';
import { NextApiRequest, NextApiResponse } from 'next';

const googleAuthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = req.cookies.sessionId;

  if (!sessionCookie) {
    return res.status(400).send('invalid cookie');
  }

  setCookie('sessionId', sessionCookie, {
    httpOnly: true,
    maxAge: ms('7 days'),
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'development' ? false : true,
  });

  return res.redirect('/');
};

export default googleAuthHandler;
