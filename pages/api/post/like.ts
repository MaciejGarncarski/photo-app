import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

export const PostLikeSchema = z.object({
  postId: z.string(),
  userId: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'PUT') {
    const response = PostLikeSchema.safeParse(req.body);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send({
        message: responseMessages.badRequest,
      });
    }

    const { postId, userId } = response.data;

    try {
      const likeAlreadyExists = await prisma.postLike.findFirst({
        where: {
          post_id: Number(postId),
          user_id: userId,
        },
      });

      if (likeAlreadyExists) {
        res.status(409).send({ status: 'error', message: 'Error while adding like' });
        return;
      }

      await prisma.postLike.create({
        data: {
          post_id: Number(postId),
          user_id: userId,
        },
        select: {
          id: true,
        },
      });
      res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
    } catch (error) {
      res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
  }

  if (method === 'DELETE') {
    const response = PostLikeSchema.safeParse(req.query);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send({
        message: responseMessages.badRequest,
      });
    }

    const { postId, userId } = response.data;

    try {
      await prisma.postLike.deleteMany({
        where: {
          user_id: userId,
          post_id: Number(postId),
        },
      });
      res.status(200).send({ status: 'resource updated successfully' });
    } catch (error) {
      res.status(400).send({ status: 'error', message: 'Error while adding like' });
    }
  }
};

export default handler;
