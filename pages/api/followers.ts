import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';
import { string } from '@/utils/string';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const FollowersPutRequestSchema = z.object({
  followingUserId: z.string(),
});

export type FollowersPutRequest = z.infer<typeof FollowersPutRequestSchema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

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

    try {
      await prisma.follower.create({
        data: {
          from: session.user.id,
          to: followingUserId,
        },
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

    const followingUserId = string(req.query.followingUserId);

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
