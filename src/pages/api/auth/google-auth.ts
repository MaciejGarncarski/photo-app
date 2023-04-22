import { NextApiRequest, NextApiResponse } from 'next';

const googleAuthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = req.headers['cookie'];

  if (!sessionCookie) {
    return res.status(400).send('invalid cookie');
  }

  return res.setHeader('Set-Cookie', sessionCookie[0]).redirect('/');
};

export default googleAuthHandler;
