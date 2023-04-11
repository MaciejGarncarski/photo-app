import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { serverEnv } from '@/src/utils/env';

import { httpCodes, responseMessages } from '@/src/consts/apiResponses';

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { createHmac } = await import('node:crypto');

  if (method !== 'GET') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const token = v4();
  const expire = Math.floor(Date.now() / 1000) + 3300;
  const secret = serverEnv.IMG_KIT_PRIVATE;

  const signature = createHmac('sha-1', secret).update(token).update(expire.toString()).digest('hex');

  const auth = {
    token,
    expire,
    signature,
  };

  res.status(httpCodes.success).send(auth);
};

export default authHandler;
