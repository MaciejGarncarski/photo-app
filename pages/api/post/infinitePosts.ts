import { Post, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

export const POSTS_PER_SCROLL = 4;

export type InfinitePost = {
  posts: Array<
    Post & {
      author: User;
      _count: {
        posts_likes: number;
        posts_comments: number;
      };
    }
  >;
  postsCount: number;
  cursor: number | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send({ status: 405, error: 'Invalid metod' });
    return;
  }
  const { skip } = req.query;

  const skipNumber = parseInt(string(skip));
  const takeNumber = POSTS_PER_SCROLL;

  try {
    const posts = await prisma.post.findMany({
      skip: skipNumber * takeNumber,
      take: takeNumber,

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
      _count: {
        id: true,
      },
    });

    const postsCount = _count.id;

    const canLoadMore = postsCount > (skipNumber + 1) * POSTS_PER_SCROLL;

    const nextCursor = canLoadMore ? skipNumber + 1 : null;

    res.status(200).send({ posts, postsCount, cursor: nextCursor });
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
