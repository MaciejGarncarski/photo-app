import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { post, user } = req.query;
  const postID = string(post);
  const userID = string(user);

  if (method === 'PUT') {
    try {
      await prisma.postLike.create({
        data: {
          post_id: Number(postID),
          user_id: userID,
        },
        select: {
          id: true,
        },
      });
      res.status(200).send({ status: 200, message: 'Success' });
    } catch (error) {
      res.status(400).send({ status: 400, message: 'Error while adding like' });
    }
  }

  if (method === 'DELETE') {
    try {
      await prisma.postLike.deleteMany({
        where: {
          post_id: Number(postID),
          user_id: userID,
        },
      });
      res.status(200).send({ status: 200, message: 'Success' });
    } catch (error) {
      res.status(400).send({ status: 400, message: 'Error while adding like' });
    }
  }
};

export default handler;
