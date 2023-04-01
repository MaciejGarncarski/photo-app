import { NextApiRequest, NextApiResponse } from 'next';

import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';

import { prisma } from '../../../../prisma/prismadb';

const chatHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'DELETE') {
    const { id } = req.query;

    try {
      await prisma.message.deleteMany({
        where: {
          id: id as string,
        },
      });

      return res.status(httpCodes.success).send(responseMessages.success);
    } catch (error) {
      return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
  }
};

export default chatHandler;
