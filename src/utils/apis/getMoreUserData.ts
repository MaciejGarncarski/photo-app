import { prisma } from '../../../prisma/prismadb';

export const getMoreUserData = async (userId: string, sessionUserId?: string) => {
  const countedPosts = await prisma.post.aggregate({
    _count: {
      id: true,
    },
    where: {
      author_id: userId,
    },
  });

  const countedFollowers = await prisma.follower.aggregate({
    _count: {
      id: true,
    },
    where: {
      to: userId,
    },
  });

  const countedFollowing = await prisma.follower.aggregate({
    _count: {
      id: true,
    },
    where: {
      from: userId,
    },
  });

  const count = {
    posts: countedPosts._count.id,
    followers: countedFollowers._count.id,
    following: countedFollowing._count.id,
  };

  const isFollowing = await prisma.follower.findFirst({
    where: {
      from: sessionUserId,
      to: userId,
    },
  });

  return { count, isFollowing };
};
