import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';
import { transformPost } from '@/utils/transformPost';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

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

    const postWithData = await Promise.all(
      posts.map(async (post) => {
        return await transformPost(post, session);
      }),
    );

    res
      .status(httpCodes.success)
      .send({ posts: postWithData, postsCount, currentPage: Number(currentPage), totalPages });
  } catch (error) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
