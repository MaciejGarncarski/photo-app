import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prismadb';

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

    if (type === 'username') {
      const userData = await prisma.user.findFirst({
        where: {
          username: user,
        },
      });
      res.status(200).send({ status: 200, user: userData });
      return;
    }

    res.status(200).send({ status: 200, user: userData });
  } catch (error) {
    res.status(400).send({ status: 400, error });
  }
};

export default handler;
