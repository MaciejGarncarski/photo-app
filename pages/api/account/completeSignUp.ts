import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).send({ status: 'unauthorized', message: 'Unauthorized request' });
    return;
  }

  const { userID, fullName, username, bio } = req.body.data;

  if (method !== 'PUT') {
    res.status(405).send({ status: 'wrong request', message: 'Only PUT request allowed' });
  }

  try {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        name: fullName,
        username,
        bio,
      },
    });
    res.status(200).send({ status: 'ok' });
  } catch (error) {
    res.status(400).send({ status: 'error', message: 'Something went wrong, error while updating' });
  }
};

export default handler;
