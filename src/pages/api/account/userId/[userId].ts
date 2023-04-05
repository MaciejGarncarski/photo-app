import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { httpCodes, responseMessages } from '@/src/utils/apis/apiResponses';
import { getUserResponse } from '@/src/utils/apis/getUserResponse';

import { prisma } from '@/prisma/prismadb';
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';

export type User = {
  username: string | null;
  name: string | null;
  id: string;
  email: string | null;
  image: string | null;
  bio: string | null;
  customImage: string | null;
  role: string;
  createdAt: Date;
};

export type UserCount = {
  followersCount: number;
  friendsCount: number;
  postsCount: number;
};

type IsFollowing = {
  isFollowing: boolean;
};

export type UserApiResponse = User & UserCount & IsFollowing;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (typeof userId !== 'string') {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }

  try {
    const userData = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!userData) {
      return res.status(httpCodes.forbidden).send(responseMessages.forbidden);
    }

    const { response } = await getUserResponse({ userData, sessionUserId: session?.user?.id });
    return res.status(httpCodes.success).send({ ...response });
  } catch (error) {
    res.status(httpCodes.forbidden).send(responseMessages.forbidden);
  }
};
export default handler;
