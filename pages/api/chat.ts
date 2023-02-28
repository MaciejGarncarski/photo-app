import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

import { InfiniteMessages } from '@/components/pages/chat/useChatMessages';

const MESSAGES_PER_SCROLL = 6;

const MessagesSchema = z.object({
  page: z.string(),
  userId: z.string(),
  friendId: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = MessagesSchema.safeParse(req.query);

  if (!response.success) {
    return res.status(httpCodes.badRequest).send({
      message: responseMessages.badRequest,
    });
  }

  if (req.method !== 'GET') {
    res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
    return;
  }

  const { page, userId, friendId } = response.data;
  try {
    const condition = {
      OR: [
        {
          receiver_id: {
            id: friendId,
          },
          sender_id: {
            id: userId,
          },
        },
        {
          receiver_id: {
            id: userId,
          },
          sender_id: {
            id: friendId,
          },
        },
      ],
    };

    const messages = await prisma.message.findMany({
      skip: Number(page) * MESSAGES_PER_SCROLL,
      take: MESSAGES_PER_SCROLL,
      orderBy: {
        created_at: 'desc',
      },
      where: condition,
    });

    const { _count } = await prisma.message.aggregate({
      _count: {
        id: true,
      },
      where: condition,
    });

    const postsCount = _count.id;
    const currentPage = Number(page);
    const lastPage = Math.round(postsCount / MESSAGES_PER_SCROLL);

    const result: InfiniteMessages = {
      currentPage,
      lastPage,
      messages: [...messages].reverse(),
      messagesCount: _count.id,
    };

    res.status(httpCodes.success).send(result);
  } catch (e) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
