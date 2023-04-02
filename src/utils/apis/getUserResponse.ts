import { User as PrismaUser } from '@prisma/client';

import { prisma } from '@/prisma/prismadb';
import { User, UserApiResponse, UserCount } from '@/src/pages/api/account/[user]';

type Arguments = {
  userData: PrismaUser;
  sessionUserId?: string;
};

export const getUserResponse = async ({ userData, sessionUserId }: Arguments) => {
  const { email, bio, created_at, customImage, id, image, name, username, role } = userData;

  const countedPosts = await prisma.post.aggregate({
    _count: {
      id: true,
    },
    where: {
      author_id: id,
    },
  });

  const countedFollowers = await prisma.follower.aggregate({
    _count: {
      id: true,
    },
    where: {
      to: id,
    },
  });

  const countedFollowing = await prisma.follower.aggregate({
    _count: {
      id: true,
    },
    where: {
      from: id,
    },
  });

  const count: UserCount = {
    postsCount: countedPosts._count.id,
    followersCount: countedFollowers._count.id,
    friendsCount: countedFollowing._count.id,
  };

  const isFollowing = await prisma.follower.findFirst({
    where: {
      from: sessionUserId,
      to: id,
    },
  });

  const transformedUserData: User = {
    email,
    role,
    id,
    username,
    customImage,
    image,
    name,
    bio,
    createdAt: created_at,
  };

  const response: UserApiResponse = {
    ...transformedUserData,
    ...count,
    isFollowing: Boolean(isFollowing),
  };

  return { response };
};
