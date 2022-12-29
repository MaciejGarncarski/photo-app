import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id, comment } = req.body;
  const session = await unstable_getServerSession(req, res, authOptions);
  const postID = parseInt(req.body.id);
  const userID = string(session?.user?.id);
  const commentText = string(comment);

  if (!session || !session.user?.id) {
    res.status(401).send({ status: 'unauthorized', message: 'Unauthorized request' });
    return;
  }

  if (method === 'PUT') {
    try {
      await prisma.postComments.create({
        data: {
          post_id: postID,
          user_id: userID,
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
    const isLikedData = await prisma.commentLike.findFirst({
      where: {
        comment_id: id,
      },
    });

    const isLiked = Boolean(isLikedData);

    if (isLiked) {
      try {
        await prisma.commentLike.deleteMany({
          where: {
            comment_id: id,
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
            comment_id: id,
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
