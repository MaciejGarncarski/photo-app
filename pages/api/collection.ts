import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).send({ status: 401, message: 'Unauthorized request' });
    return;
  }

  if (method === 'PUT') {
    try {
      const { userID, postID } = req.body;
      await prisma.collection.create({
        data: {
          post_id: postID,
          user_id: userID,
        },
      });

      res.status(200).send({ status: 200, message: 'Success' });
    } catch (error) {
      console.log(error);
      res.status(400).send({ status: 400, message: 'Cannot add post to your collection' });
    }
  }

  if (method === 'GET') {
    try {
      const data = await prisma.collection.findMany({
        where: {
          user_id: session.user?.id,
        },
      });
      res.status(200).send({ status: 200, data });
    } catch (error) {
      res.status(400).send({ status: 400, message: 'Cannot download your collection' });
    }
  }
};

export default handler;
