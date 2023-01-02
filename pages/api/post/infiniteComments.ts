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
    const comments = await prisma.postComment.findMany({
      skip: skipNumber * takeNumber,
      take: takeNumber,

      where: {
        post_id: parseInt(string(postId)),
      },

      orderBy: {
        id: 'desc',
      },
    });

    const { _count } = await prisma.postComment.aggregate({
      where: {
        post_id: parseInt(string(postId)),
      },
      _count: {
        id: true,
      },
    });

    const commentsWithLikes = await Promise.all(
      comments.map(async (comment) => {
        const isLiked = await prisma.commentLike.findFirst({
          where: {
            comment_id: comment.id,
          },
        });
        const likesCount = await prisma.commentLike.aggregate({
          where: {
            comment_id: comment.id,
          },
          _count: {
            comment_id: true,
          },
        });
        return { ...comment, isLiked: Boolean(isLiked), likesCount: likesCount._count.comment_id };
      }),
    );

    const commentsCount = _count.id;
    const canLoadMore = commentsCount > (skipNumber + 1) * COMMENTS_PER_SCROLL;
    const nextCursor = canLoadMore ? skipNumber + 1 : null;

    res.status(200).send({ comments: commentsWithLikes, commentsCount, cursor: nextCursor });
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
