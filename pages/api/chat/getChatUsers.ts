import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

const USERS_PER_SCROLL = 5;

const schema = z.object({
  userId: z.string(),
  currentPage: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const response = schema.safeParse(req.query);
  if (!response.success) {
    return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
  }

  const { userId, currentPage } = response.data;

  const condition = {
    NOT: [
      {
        id: userId,
      },
    ],
  };

  try {
    const users = await prisma.user.findMany({
      where: condition,
      skip: Number(currentPage),
      take: USERS_PER_SCROLL,
    });

    const { _count } = await prisma.user.aggregate({
      where: condition,
      _count: {
        id: true,
      },
    });

    const usersCount = _count.id;
    const canLoadMore = usersCount > (+currentPage + 1) * USERS_PER_SCROLL;
    const nextCursor = canLoadMore ? +currentPage + 1 : null;

    const usersWithChatRooms = await Promise.all(
      users.map(async (user) => {
        const chatRoom = await prisma.chatRoom.findFirst({
          where: {
            OR: [
              {
                userOne_id: userId,
                userTwo_id: user.id,
              },
              { userTwo_id: userId, userOne_id: user.id },
            ],
          },
        });

        if (!chatRoom) {
          const { id } = await prisma.chatRoom.create({
            data: {
              userOne_id: userId,
              userTwo_id: user.id,
            },
          });

          return {
            user: user,
            chatRoomId: id,
          };
        }

        return {
          user: user,
          chatRoomId: chatRoom.id,
        };
      }),
    );

    return res.status(httpCodes.success).send({ users: usersWithChatRooms, usersCount, canLoadMore, nextCursor });
  } catch (error) {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
