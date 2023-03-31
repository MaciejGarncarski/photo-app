import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const EditAccountSchema = z.object({
  bio: z.string().nullish(),
  fullName: z.string().nullish(),
  username: z.string().nullish(),
  userId: z.string(),
  newAvatarUrl: z.string().nullish(),
});

export type EditAccountData = z.infer<typeof EditAccountSchema>;

const editAccountHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
  }

  if (req.method === 'POST') {
    const fieldsResponse = EditAccountSchema.safeParse(req.body);

    if (!fieldsResponse.success) {
      return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
    }

    const { newAvatarUrl, bio, fullName, username, userId } = fieldsResponse.data;

    if (userId !== session.user?.id) {
      return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
    }

    try {
      await prisma.user.update({
        data: {
          bio,
          name: fullName,
          username,
          customImage: newAvatarUrl,
        },
        where: {
          id: userId,
        },
      });

      res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
    } catch (error) {
      return res.status(httpCodes.forbidden).send(responseMessages.forbidden);
    }
  }
};

export default editAccountHandler;
