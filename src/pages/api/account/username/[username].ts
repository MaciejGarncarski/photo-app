import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { httpCodes, responseMessages } from '@/src/utils/apis/apiResponses';
import { getUserResponse } from '@/src/utils/apis/getUserResponse';

import { prisma } from '@/prisma/prismadb';
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const { username } = req.query;

  if (typeof username !== 'string') {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }

  const userData = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!userData) {
    return res.status(httpCodes.forbidden).send(responseMessages.forbidden);
  }

  const { response } = await getUserResponse({ userData, sessionUserId: session?.user?.id });
  return res.status(httpCodes.success).send({ ...response });
};

export default handler;
