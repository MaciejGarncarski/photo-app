import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { httpCodes, responseMessages } from '@/src/utils/apis/apiResponses';

import { PostComment } from '@/src/components/organisms/postComments/useInfiniteComments';

import { prisma } from '@/prisma/prismadb';

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

  const { skip: skipAsString, postId } = response.data;
  const skip = parseInt(skipAsString);
  const postIdAsNumber = parseInt(postId);

  const takeNumber = COMMENTS_PER_SCROLL;

  try {
    const comments = await prisma.postComment.findMany({
      skip: skip * takeNumber,
      take: takeNumber,

      where: {
        post_id: postIdAsNumber,
      },

      orderBy: {
        id: 'desc',
      },
    });

    const { _count } = await prisma.postComment.aggregate({
      where: {
        post_id: postIdAsNumber,
      },
      _count: {
        id: true,
      },
    });

    const commentsWithLikes = await Promise.all(
      comments.map(async ({ comment_text, created_at, id, post_id, user_id }) => {
        const isLiked = await prisma.commentLike.findFirst({
          where: {
            comment_id: id,
          },
        });
        const likesCount = await prisma.commentLike.aggregate({
          where: {
            comment_id: id,
          },
          _count: {
            comment_id: true,
          },
        });

        const comment: PostComment = {
          commentText: comment_text,
          createdAt: created_at,
          id,
          postId: post_id,
          isLiked: Boolean(isLiked),
          likesCount: likesCount._count.comment_id,
          userId: user_id,
        };

        return comment;
      }),
    );

    const commentsCount = _count.id;
    const canLoadMore = commentsCount > (skip + 1) * COMMENTS_PER_SCROLL;
    const nextCursor = canLoadMore ? skip + 1 : null;

    res.status(httpCodes.success).send({ comments: commentsWithLikes, commentsCount, cursor: nextCursor });
  } catch (e) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
