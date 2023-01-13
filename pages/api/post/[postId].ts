import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

const PostByIdSchema = z.object({
  postId: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = PostByIdSchema.safeParse(req.query);

  if (!response.success) {
    return res.status(httpCodes.badRequest).send({
      message: responseMessages.badRequest,
    });
  }

  const { postId } = response.data;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(postId),
      },
    });

    const postComments = await prisma.postComment.aggregate({
      where: {
        post_id: parseInt(postId),
      },
      _count: {
        id: true,
      },
    });

    const postLikes = await prisma.postLike.aggregate({
      where: {
        post_id: parseInt(postId),
      },
      _count: {
        id: true,
      },
    });

    const data = {
      post,
      postCommentsCount: postComments._count.id,
      postLikesCount: postLikes._count.id,
    };

    res.status(httpCodes.success).send({ data });
  } catch (error) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
