import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

const POSTS_PER_SCROLL = 9;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send({ status: 405, error: 'Invalid metod' });
    return;
  }

  const { skip, user } = req.query;
  if (typeof user !== 'string') {
    res.status(404).send({ status: 'not found' });
    return;
  }

  const skipNumber = parseInt(string(skip));
  const takeNumber = POSTS_PER_SCROLL;

  try {
    const posts = await prisma.post.findMany({
      skip: skipNumber * takeNumber,
      take: takeNumber,

      where: {
        author_id: user,
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
