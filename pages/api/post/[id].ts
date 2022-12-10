import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prismadb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return;
  }

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    const postComments = await prisma.postComments.aggregate({
      where: {
        post_id: parseInt(id),
      },
      _count: {
        id: true,
      },
    });

    const postLikes = await prisma.postLike.aggregate({
      where: {
        post_id: parseInt(id),
      },
      _count: {
        id: true,
      },
    });

    const data = {
      post,
      postCommentsCount: postComments._count.id,
      postLikesCount: postLikes._count.id,
    };

    res.status(200).send({ status: 200, data });
  } catch (error) {
    res.status(400).send({ status: 'error', error });
  }
};

export default handler;
