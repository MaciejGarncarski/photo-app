import { User as PrismaUser } from '@prisma/client';

import { prisma } from '@/prisma/prismadb';
import { User, UserApiResponse } from '@/src/consts/schemas';

type Arguments = {
  userData: PrismaUser;
  sessionUserId?: string;
};

export const getUserResponse = async ({ userData, sessionUserId }: Arguments) => {
  const { bio, created_at, customImage, id, image, name, username } = userData;

  const countedPosts = await prisma.post.count({
    where: {
      author_id: id,
    },
  });

  const countedFollowers = await prisma.follower.count({
    where: {
      to: id,
    },
  });

  const countedFollowing = await prisma.follower.count({
    where: {
      from: id,
    },
  });

  const count = {
    postsCount: countedPosts,
    followersCount: countedFollowers,
    friendsCount: countedFollowing,
  };

  const isFollowing = await prisma.follower.findFirst({
    where: {
      from: sessionUserId,
      to: id,
    },
  });

  const transformedUserData: User = {
    id,
    username: username || '',
    customImage,
    image,
    name,
    bio,
    createdAt: created_at.toString(),
  };

  const response: UserApiResponse = {
    ...transformedUserData,
    ...count,
    isFollowing: Boolean(isFollowing),
  };

  return { response };
};
