import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prismadb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log({ id });
  if (typeof id !== 'string') {
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    res.status(200).send({ status: 200, user });
  } catch (error) {
    res.status(400).send({ status: 400, error });
  }
};

export default handler;
