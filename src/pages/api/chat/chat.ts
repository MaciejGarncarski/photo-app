import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { httpCodes, responseMessages } from '@/src/utils/apis/apiResponses';

import { Message } from '@/src/components/atoms/chatMessage/ChatMessage';
import { InfiniteMessages } from '@/src/components/pages/chatRoom/useChatMessages';

import { prisma } from '@/prisma/prismadb';

const MESSAGES_PER_PAGE = 6;

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
  const currentPage = Number(page);

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
      skip: currentPage * MESSAGES_PER_PAGE,
      take: MESSAGES_PER_PAGE,
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
    const maxPages = postsCount / MESSAGES_PER_PAGE;
    const totalPages = maxPages % 1 !== 0 ? Math.round(maxPages) + 1 : maxPages;

    const transformedMessages = messages.map((message) => {
      const transformed: Message = {
        ...message,
        createdAt: message.created_at,
      };

      return transformed;
    });

    const result: InfiniteMessages = {
      currentPage,
      totalPages,
      messages: transformedMessages,
      messagesCount: _count.id,
    };

    res.status(httpCodes.success).send(result);
  } catch (e) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
