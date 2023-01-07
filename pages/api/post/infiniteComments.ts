import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';
import { string } from '@/utils/string';

const COMMENTS_PER_SCROLL = 10;

const InfiniteCommentsSchema = z.object({
  skip: z.string(),
  postId: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = InfiniteCommentsSchema.safeParse(req.query);

  if (!response.success) {
    return res.status(httpCodes.badRequest).send({
      message: responseMessages.badRequest,
    });
  }

  if (req.method !== 'GET') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const { skip, postId } = response.data;

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
