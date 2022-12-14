import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const CompleteSignUpSchema = z.object({
  userId: z.string(),
  bio: z.string().optional(),
  username: z.string(),
  fullName: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
  }

  const response = CompleteSignUpSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(httpCodes.badRequest).send({
      message: responseMessages.badRequest,
    });
  }

  const { userId, fullName, username, bio } = response.data;

  if (method !== 'PUT') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: fullName,
        username,
        bio,
      },
    });
    res.status(httpCodes.success).send(responseMessages.success);
  } catch (error) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
