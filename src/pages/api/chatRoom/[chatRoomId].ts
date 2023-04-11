import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/prisma/prismadb';
import { httpCodes, responseMessages } from '@/src/consts/apiResponses';
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';

const chatRoomRequestSchema = z.object({
  chatRoomId: z.string().transform((id) => parseInt(id)),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
  }

  if (req.method !== 'GET') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const response = chatRoomRequestSchema.safeParse(req.query);
  if (!response.success) {
    return res.status(httpCodes.badRequest).send({ message: responseMessages.badPayload, error: response.error });
  }

  const { chatRoomId } = response.data;

  const chatRoomData = await prisma.chatRoom.findFirst({
    where: {
      id: chatRoomId,
      OR: [
        {
          userOne_id: session.user.id,
          userTwo_id: {
            not: {
              equals: 'undefined',
            },
          },
        },
        {
          userTwo_id: session.user.id,
          userOne_id: {
            not: {
              equals: 'undefined',
            },
          },
        },
      ],
    },
  });

  return res.status(httpCodes.success).send(chatRoomData);
};

export default handler;
