import { NextApiRequest, NextApiResponse } from 'next';

import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';

import { prisma } from '../../../../prisma/prismadb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const { userId, friendId, text } = req.body;

  try {
    await prisma.message.create({
      data: {
        text,
        receiver: friendId,
        sender: userId,
      },
      select: {
        id: true,
        created_at: true,
      },
    });

    return res.status(httpCodes.success).send(responseMessages.success);
  } catch (error) {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
