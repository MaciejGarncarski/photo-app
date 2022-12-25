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

  if (!session) {
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
};

export default handler;
