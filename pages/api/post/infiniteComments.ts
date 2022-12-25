import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

const COMMENTS_PER_SCROLL = 10;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send({ status: 405, error: 'Invalid metod' });
    return;
  }
  const { skip, postId } = req.query;

  const skipNumber = parseInt(string(skip));
  const takeNumber = COMMENTS_PER_SCROLL;

  try {
    const comments = await prisma.postComments.findMany({
      skip: skipNumber * takeNumber,
      take: takeNumber,

      where: {
        post_id: parseInt(string(postId)),
      },

      orderBy: {
        id: 'desc',
      },
    });

    const { _count } = await prisma.postComments.aggregate({
      where: {
        post_id: parseInt(string(postId)),
      },
      _count: {
        id: true,
      },
    });

    const commentsCount = _count.id;
    const canLoadMore = commentsCount > (skipNumber + 1) * COMMENTS_PER_SCROLL;
    const nextCursor = canLoadMore ? skipNumber + 1 : null;

    res.status(200).send({ comments, commentsCount, cursor: nextCursor });
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
