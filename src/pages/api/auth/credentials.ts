import { NextApiRequest, NextApiResponse } from 'next';

import { apiClient } from '@/src/utils/apis/apiClient';

const credentialsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const loginResponse = await apiClient.post(`auth/login`, {
    email,
    password,
  });

  const sessionCookie = loginResponse.headers['set-cookie'];

  if (!sessionCookie) {
    return res.status(400).send('invalid cookie');
  }

  return res.setHeader('Set-Cookie', sessionCookie[0]).send('ok');
};

export default credentialsHandler;
