import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';

import { authOptions } from './auth/[...nextauth]';
import { prisma } from '../../../prisma/prismadb';

const otherUsersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== 'GET') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: session?.user?.id,
        },
      },
      take: 4,
      orderBy: {
        id: 'desc',
      },
    });

    return res.status(httpCodes.success).send(users);
  } catch (error) {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default otherUsersHandler;
