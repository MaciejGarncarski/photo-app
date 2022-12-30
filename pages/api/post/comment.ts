import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const CommentPutRequestSchema = z.object({
  commentText: z.string(),
  postId: z.number(),
});

export const CommentPostRequestSchema = z.object({
  commentId: z.number(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    res.status(401).send({ status: 'unauthorized', message: 'Unauthorized request' });
    return;
  }

  if (method === 'PUT') {
    const response = CommentPutRequestSchema.safeParse(req.body);

    if (!response.success) {
      return res.status(400).send({
        message: `Yo, bad payload!`,
      });
    }

    const {
      data: { commentText, postId },
    } = response;

    const userId = string(session?.user?.id);

    try {
      await prisma.postComments.create({
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
      res.status(200).send({ status: 'ok' });
    } catch (error) {
      res.status(400).send({ status: 'error', message: 'Error while adding comment' });
    }
  }

  if (method === 'DELETE') {
    const commentId = parseInt(string(req.query.commentId));

    if (!commentId) {
      res.status(400).send({ status: 'error', message: 'commentId is mandatory' });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    const comment = await prisma.postComments.findFirst({
      where: {
        id: commentId,
      },
    });

    const isAbleToDelete = comment?.user_id === session?.user?.id || user?.role === 'ADMIN';

    if (!isAbleToDelete) {
      res.status(405).send({ status: 'unauthorized' });
    }

    try {
      await prisma.commentLike.deleteMany({
        where: {
          comment_id: commentId,
        },
      });
      await prisma.postComments.deleteMany({
        where: {
          id: commentId,
        },
      });
      res.status(200).send({ status: 'ok' });
    } catch (error) {
      res.status(400).send({ status: 'error', message: 'Error while deleting comment' });
    }
  }

  if (method === 'POST') {
    const response = CommentPostRequestSchema.safeParse(req.body);

    if (!response.success) {
      return res.status(400).send({
        message: `Yo, bad payload!`,
      });
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
        res.status(200).send({ status: 'ok', message: 'deleted' });
      } catch (error) {
        res.status(400).send({ status: 'error' });
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
        res.status(200).send({ status: 'ok', message: 'created' });
      } catch (error) {
        res.status(400).send({ status: 'error' });
      }
    }
  }
};

export default handler;
