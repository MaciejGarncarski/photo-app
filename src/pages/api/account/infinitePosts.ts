import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { httpCodes, responseMessages } from '@/src/consts/apiResponses';
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';

import { prisma } from '../../../../prisma/prismadb';

export const POSTS_PER_SCROLL = 6;

export type InfinitePosts<T> = {
  posts: Array<T>;
  postsCount: number;
  cursor: number | null;
};

const InfinitePostsSchema = z.object({
  userId: z.string(),
  currentPage: z.string().optional(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const response = InfinitePostsSchema.safeParse(req.query);

  if (!response.success) {
    return res.status(httpCodes.badRequest).send({
      message: responseMessages.badPayload,
    });
  }

  if (req.method !== 'GET') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const { currentPage, userId } = response.data;

  try {
    const posts = await prisma.post.findMany({
      skip: Number(currentPage) * POSTS_PER_SCROLL,
      take: POSTS_PER_SCROLL,

      where: {
        author_id: userId,
      },

      include: {
        author: true,
        posts_likes: {
          where: {
            user_id: session?.user?.id,
          },
        },
        _count: {
          select: {
            posts_likes: true,
            posts_comments: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    const { _count } = await prisma.post.aggregate({
      where: {
        author_id: userId,
      },
      _count: {
        id: true,
      },
    });

    const postsCount = _count.id;
    const maxPages = postsCount / POSTS_PER_SCROLL;
    const roundedMaxPages = Math.round(maxPages);
    const totalPages = roundedMaxPages;

    res.status(httpCodes.success).send({ posts, postsCount, currentPage: Number(currentPage), totalPages });
  } catch (error) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
