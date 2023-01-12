import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';
import { string } from '@/utils/string';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const CommentPutRequestSchema = z.object({
  commentText: z.string(),
  postId: z.number(),
});

export const CommentPostRequestSchema = z.object({
  commentId: z.number(),
});

const CommentDeletePostSchema = z.object({
  commentId: z.number(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
  }

  if (method === 'PUT') {
    const response = CommentPutRequestSchema.safeParse(req.body);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
    }

    const {
      data: { commentText, postId },
    } = response;

    const userId = string(session?.user?.id);

    try {
      await prisma.postComment.create({
        data: {
          post_id: postId,
          user_id: userId,
          comment_text: commentText,
        },
        select: {
          created_at: true,
          id: true,
        },
      });
      res.status(httpCodes.success).send(responseMessages.success);
    } catch (error) {
      return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
  }

  if (method === 'DELETE') {
    const response = CommentDeletePostSchema.safeParse(req.query.commentId);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
    }

    const commentId = response.data.commentId;

    const user = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    const comment = await prisma.postComment.findFirst({
      where: {
        id: commentId,
      },
    });

    const isAbleToDelete = comment?.user_id === session?.user?.id || user?.role === 'ADMIN';

    if (!isAbleToDelete) {
      return res.status(httpCodes.forbidden).send(responseMessages.forbidden);
    }

    try {
      await prisma.commentLike.deleteMany({
        where: {
          comment_id: commentId,
        },
      });
      await prisma.postComment.deleteMany({
        where: {
          id: commentId,
        },
      });
      res.status(httpCodes.success).send(responseMessages.success);
    } catch (error) {
      return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
  }

  if (method === 'POST') {
    const response = CommentPostRequestSchema.safeParse(req.body);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
    }

    const {
      data: { commentId },
    } = response;

    const isLikedData = await prisma.commentLike.findFirst({
      where: {
        comment_id: commentId,
      },
    });

    const isLiked = Boolean(isLikedData);

    if (isLiked) {
      try {
        await prisma.commentLike.deleteMany({
          where: {
            comment_id: commentId,
          },
        });
        res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
      } catch (error) {
        return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
      }
    }
    if (!isLiked) {
      try {
        await prisma.commentLike.create({
          data: {
            user_id: session.user?.id,
            comment_id: commentId,
          },
          select: {
            id: true,
          },
        });
        res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
      } catch (error) {
        return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
      }
    }
  }
};

export default handler;
