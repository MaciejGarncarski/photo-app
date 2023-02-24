import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';
const USERS_PER_SCROLL = 6;

const schema = z.object({
  userId: z.string(),
  skip: z.string(),
  type: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const response = schema.safeParse(req.query);
  if (!response.success) {
    return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
  }

  const { userId, skip, type } = response.data;

  if (type !== 'followers' && type !== 'following') {
    return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
  }

  try {
    if (type === 'followers') {
      const users = await prisma.follower.findMany({
        skip: Number(skip),
        take: USERS_PER_SCROLL,
        select: {
          from_user: true,
        },
        where: {
          to_user: {
            id: userId,
          },
        },
      });

      const { _count } = await prisma.follower.aggregate({
        _count: {
          id: true,
        },
        where: {
          to_user: {
            id: userId,
          },
        },
      });

      const usersCount = _count.id;
      const canLoadMore = usersCount > (+skip + 1) * USERS_PER_SCROLL;
      const nextCursor = canLoadMore ? +skip + 1 : null;

      const mappedUsers = users.map((user) => user.from_user);

      return res.status(httpCodes.success).send({ users: mappedUsers, usersCount, canLoadMore, nextCursor });
    }

    if (type === 'following') {
      const users = await prisma.follower.findMany({
        skip: Number(skip),
        take: USERS_PER_SCROLL,
        select: {
          to_user: true,
        },
        where: {
          from_user: {
            id: userId,
          },
        },
      });

      const mappedUsers = users.map((user) => user.to_user);

      const { _count } = await prisma.follower.aggregate({
        _count: {
          id: true,
        },
        where: {
          from_user: {
            id: userId,
          },
        },
      });

      const usersCount = _count.id;
      const canLoadMore = usersCount > (+skip + 1) * USERS_PER_SCROLL;
      const nextCursor = canLoadMore ? +skip + 1 : null;

      return res.status(httpCodes.success).send({ users: mappedUsers, usersCount, canLoadMore, nextCursor });
    }
  } catch (error) {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
