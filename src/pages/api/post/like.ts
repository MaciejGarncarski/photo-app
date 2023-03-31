import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const PostLikeSchema = z.object({
  postId: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);

  if (method !== 'POST') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  if (!session?.user?.id) {
    return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
  }

  const response = PostLikeSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
  }

  const { postId } = response.data;

  try {
    const isLikedAlready = await prisma.postLike.findFirst({
      where: {
        post_id: Number(postId),
        user_id: session.user?.id,
      },
    });

    if (isLikedAlready) {
      await prisma.postLike.deleteMany({
        where: {
          user_id: session.user?.id,
          post_id: Number(postId),
        },
      });

      return res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
    }

    await prisma.postLike.create({
      data: {
        post_id: Number(postId),
        user_id: session.user?.id,
      },
      select: {
        id: true,
      },
    });

    res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
  } catch (error) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
