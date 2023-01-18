import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { z } from 'zod';

import { imageKit } from '@/lib/imagekit';
import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const DeleteAvatarSchema = z.object({
  userId: z.string(),
});

export type DeleteAvatarData = z.infer<typeof DeleteAvatarSchema>;

const deleteAvatarHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
  }

  if (req.method === 'DELETE') {
    const response = DeleteAvatarSchema.safeParse(req.query);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
    }

    const { userId } = response.data;

    if (session.user?.id !== userId) {
      return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
    }

    try {
      await imageKit.deleteFolder(`${userId}/avatar/custom/`);

      await prisma.user.update({
        data: {
          customImage: null,
        },
        where: {
          id: userId,
        },
      });

      res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
    } catch (error) {
      res.status(httpCodes.forbidden).send(responseMessages.forbidden);
    }
  }
};

export default deleteAvatarHandler;
