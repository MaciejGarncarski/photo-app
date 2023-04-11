import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { transformPost } from '@/src/utils/apis/transformPost';

import { httpCodes, responseMessages } from '@/src/consts/apiResponses';

import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../../prisma/prismadb';

const PostByIdSchema = z.object({
  postId: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = PostByIdSchema.safeParse(req.query);
  const session = await getServerSession(req, res, authOptions);

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

    const postData = await transformPost(post, session);
    res.status(httpCodes.success).send(postData);
  } catch (error) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
