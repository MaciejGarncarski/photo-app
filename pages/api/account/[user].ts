import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';
import { getMoreUserData } from '@/utils/getMoreUserData';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, user } = req.query;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (typeof user !== 'string') {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }

  if (type !== 'username') {
    try {
      const userData = await prisma.user.findFirst({
        where: {
          id: user,
        },
      });

      const { count, isFollowing } = await getMoreUserData(user, session?.user?.id);
      res.status(httpCodes.success).send({ user: userData, count, isFollowing: Boolean(isFollowing) });
    } catch (error) {
      res.status(httpCodes.forbidden).send({ status: responseMessages.forbidden, error });
    }
  }

  if (type === 'username') {
    try {
      const userData = await prisma.user.findFirst({
        where: {
          username: user,
        },
      });

      const { count, isFollowing } = await getMoreUserData(userData?.id ?? '', session?.user?.id);
      return res.status(httpCodes.success).send({ user: userData, count, isFollowing: Boolean(isFollowing) });
    } catch (error) {
      res.status(httpCodes.forbidden).send({ status: responseMessages.forbidden, error });
    }
  }
};
export default handler;
