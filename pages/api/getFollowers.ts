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
      const condition = {
        to: userId,
      };

      const users = await prisma.follower.findMany({
        skip: Number(skip),
        take: USERS_PER_SCROLL,
        select: {
          from_user: true,
        },
        where: condition,
      });

      const { _count } = await prisma.follower.aggregate({
        _count: {
          id: true,
        },
        where: condition,
      });

      const usersCount = _count.id;
      const canLoadMore = usersCount > (+skip + 1) * USERS_PER_SCROLL;
      const nextCursor = canLoadMore ? +skip + 1 : null;

      const usersWithChatRooms = await Promise.all(
        users.map(async (user) => {
          const chatRoom = await prisma.chatRoom.findFirst({
            where: {
              OR: [
                {
                  userOne_id: userId,
                  userTwo_id: user.from_user.id,
                },
                { userTwo_id: userId, userOne_id: user.from_user.id },
              ],
            },
          });

          if (!chatRoom) {
            const { id } = await prisma.chatRoom.create({
              data: {
                userOne_id: userId,
                userTwo_id: user.from_user.id,
              },
            });

            return {
              user: user.from_user,
              chatRoomId: id,
            };
          }

          return {
            user: user.from_user,
            chatRoomId: chatRoom.id,
          };
        }),
      );

      return res.status(httpCodes.success).send({ users: usersWithChatRooms, usersCount, canLoadMore, nextCursor });
    }

    if (type === 'following') {
      const condition = {
        from: userId,
      };

      const users = await prisma.follower.findMany({
        skip: Number(skip),
        take: USERS_PER_SCROLL,
        select: {
          to_user: true,
        },
        where: condition,
      });

      const { _count } = await prisma.follower.aggregate({
        _count: {
          id: true,
        },
        where: condition,
      });

      const usersCount = _count.id;
      const canLoadMore = usersCount > (+skip + 1) * USERS_PER_SCROLL;
      const nextCursor = canLoadMore ? +skip + 1 : null;

      const usersWithChatRooms = await Promise.all(
        users.map(async (user) => {
          const chatRoom = await prisma.chatRoom.findFirst({
            where: {
              OR: [
                {
                  userOne_id: userId,
                  userTwo_id: user.to_user.id,
                },
                { userTwo_id: userId, userOne_id: user.to_user.id },
              ],
            },
          });

          if (!chatRoom) {
            const { id } = await prisma.chatRoom.create({
              data: {
                userOne_id: userId,
                userTwo_id: user.to_user.id,
              },
            });

            return {
              user: user.to_user,
              chatRoomId: id,
            };
          }

          return {
            user: user.to_user,
            chatRoomId: chatRoom.id,
          };
        }),
      );

      return res.status(httpCodes.success).send({ users: usersWithChatRooms, usersCount, canLoadMore, nextCursor });
    }
  } catch (error) {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
