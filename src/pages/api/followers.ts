import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { httpCodes, responseMessages } from '@/src/utils/apis/apiResponses';

import { authOptions } from '@/src/pages/api/auth/[...nextauth]';

import { prisma } from '../../../prisma/prismadb';

const FollowersPutRequestSchema = z.object({
  followingUserId: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);

  if (method === 'PUT') {
    if (!session?.user?.id) {
      return res.status(httpCodes.unauthorized).send({ message: responseMessages.unauthorized });
    }

    const response = FollowersPutRequestSchema.safeParse(req.body);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send({
        message: responseMessages.badRequest,
      });
    }

    const {
      data: { followingUserId },
    } = response;

    const data = {
      from: session.user.id,
      to: followingUserId,
    };

    try {
      const isUserReal = await prisma.user.findFirst({
        where: {
          id: followingUserId,
        },
      });

      if (!isUserReal) {
        return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
      }

      const isAlreadyFollower = await prisma.follower.findFirst({
        where: data,
      });

      if (isAlreadyFollower) {
        return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
      }

      await prisma.follower.create({
        data,
        select: {
          created_at: true,
          id: true,
        },
      });
      res.status(httpCodes.success).send({ messsage: responseMessages.success });
    } catch (error) {
      return res.status(httpCodes.badRequest).send({
        message: responseMessages.badRequest,
      });
    }
  }

  if (method === 'DELETE') {
    if (!session?.user?.id) {
      return res.status(httpCodes.unauthorized).send({ message: responseMessages.unauthorized });
    }

    const followingUserId = req.query.followingUserId as string;

    try {
      await prisma.follower.deleteMany({
        where: {
          from: session.user.id,
          to: followingUserId,
        },
      });

      res.status(httpCodes.success).send({ messsage: responseMessages.success });
    } catch (error) {
      return res.status(httpCodes.forbidden).send({
        message: responseMessages.forbidden,
      });
    }
  }
};

export default handler;
