import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';
import { transformPost } from '@/utils/apis/transformPost';

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
        id: Number(postId),
      },
      include: {
        author: true,
        _count: {
          select: {
            posts_likes: true,
            posts_comments: true,
          },
        },
      },
    });

    if (!post) {
      return;
    }

    const postData = await transformPost(post);
    res.status(httpCodes.success).send(postData);
  } catch (error) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
