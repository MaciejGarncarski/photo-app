import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { httpCodes, responseMessages } from '@/src/utils/apis/apiResponses';

import { prisma } from '../../../../prisma/prismadb';

const USERS_PER_SCROLL = 6;

const schema = z.object({
  userId: z.string(),
  currentPage: z.string(),
  searchedUser: z.string().optional(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const response = schema.safeParse(req.query);
  if (!response.success) {
    return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
  }

  const { userId, currentPage, searchedUser } = response.data;

  const condition = {
    OR: [{ username: { contains: searchedUser } }, { name: { contains: searchedUser } }],
    NOT: [
      {
        id: userId,
      },
    ],
  };

  try {
    const users = await prisma.user.findMany({
      where: condition,
      skip: Number(currentPage) * USERS_PER_SCROLL,
      take: USERS_PER_SCROLL,
    });

    const { _count } = await prisma.user.aggregate({
      where: condition,
      _count: {
        id: true,
      },
    });

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

    const usersCount = _count.id;
    const maxPages = usersCount / USERS_PER_SCROLL;
    const roundedMaxPages = Math.round(maxPages);
    const totalPages = roundedMaxPages;

    return res
      .status(httpCodes.success)
      .send({ users: usersWithChatRooms, usersCount, totalPages, currentPage: +currentPage });
  } catch (error) {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
