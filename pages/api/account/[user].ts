import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prismadb';

const countUser = async (userID: string) => {
  const countedPosts = await prisma.post.aggregate({
    _count: {
      id: true,
    },
    where: {
      author_id: userID,
    },
  });

  const countedFollowers = await prisma.follower.aggregate({
    _count: {
      id: true,
    },
    where: {
      to: userID,
    },
  });

  const countedFollowing = await prisma.follower.aggregate({
    _count: {
      id: true,
    },
    where: {
      from: userID,
    },
  });

  const count = {
    posts: countedPosts._count.id,
    followers: countedFollowers._count.id,
    following: countedFollowing._count.id,
  };

  return count;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, type } = req.query;

  if (typeof user !== 'string') {
    return;
  }

  try {
    const userData = await prisma.user.findFirst({
      where: {
        id: user,
      },
    });
    if (!user) {
      res.status(404).send({ status: 404 });
      return;
    }

    if (type === 'username') {
      const userData = await prisma.user.findFirst({
        where: {
          username: user,
        },
      });

      if (!user) {
        res.status(404).send({ status: 404 });
        return;
      }
      const count = await countUser(userData?.id ?? '');
      res.status(200).send({ status: 200, user: userData, count });
      return;
    }

    const count = await countUser(user);
    res.status(200).send({ status: 200, user: userData, count });
  } catch (error) {
    res.status(400).send({ status: 400, error });
  }
};

export default handler;
