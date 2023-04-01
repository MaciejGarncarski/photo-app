import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';
import { getMoreUserData } from '@/utils/apis/getMoreUserData';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { prisma } from '../../../../prisma/prismadb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, user } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (typeof user !== 'string') {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }

  try {
    if (type !== 'username') {
      const userData = await prisma.user.findFirst({
        where: {
          id: user,
        },
      });

      const { count, isFollowing } = await getMoreUserData(user, session?.user?.id);
      return res.status(httpCodes.success).send({ user: userData, count, isFollowing: Boolean(isFollowing) });
    }

    if (type === 'username') {
      const userData = await prisma.user.findFirst({
        where: {
          username: user,
        },
      });

      const { count, isFollowing } = await getMoreUserData(userData?.id ?? '', session?.user?.id);
      return res.status(httpCodes.success).send({ user: userData, count, isFollowing: Boolean(isFollowing) });
    }
  } catch (error) {
    res.status(httpCodes.forbidden).send(responseMessages.forbidden);
  }
};
export default handler;
