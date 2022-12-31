import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

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
  const session = await unstable_getServerSession(req, res, authOptions);

  if (typeof user !== 'string') {
    return;
  }

  try {
    if (!user) {
      return res.status(httpCodes.Bad_request).send({ status: responseMessages.Bad_request });
    }

    const userData = await prisma.user.findFirst({
      where: {
        id: user,
      },
    });

    const isFollowing = await prisma.follower.findFirst({
      where: {
        from: session?.user?.id,
        to: user,
      },
    });

    if (type === 'username') {
      const userData = await prisma.user.findFirst({
        where: {
          username: user,
        },
      });

      if (!user) {
        return res.status(httpCodes.Unauthorized).send({ status: responseMessages.Unauthorized });
      }
      const count = await countUser(userData?.id ?? '');
      return res
        .status(httpCodes.Success)
        .send({ user: userData, count, isFollowing: Boolean(isFollowing) });
    }

    const count = await countUser(user);
    res
      .status(httpCodes.Success)
      .send({ user: userData, count, isFollowing: Boolean(isFollowing) });
  } catch (error) {
    res.status(httpCodes.Forbidden).send({ status: responseMessages.Forbidden, error });
  }
};

export default handler;
