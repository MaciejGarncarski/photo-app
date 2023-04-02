import { NextApiRequest, NextApiResponse } from 'next';

import { httpCodes, responseMessages } from '@/src/utils/apis/apiResponses';

import { prisma } from '../../../../prisma/prismadb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const { postId, description } = req.body;

  try {
    await prisma.post.updateMany({
      where: {
        id: Number(postId),
      },
      data: {
        description: description ?? '',
      },
    });

    res.status(httpCodes.success).send(responseMessages.success);
  } catch (error) {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
