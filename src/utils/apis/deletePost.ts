import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { httpCodes, responseMessages } from '@/src/utils/apis/apiResponses';
import { imageKit } from '@/src/utils/imagekit';

import { authOptions } from '@/src/pages/api/auth/[...nextauth]';

import { prisma } from '../../../prisma/prismadb';

const DeletePostSchema = z.object({
  postId: z.string(),
});

export const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  const response = DeletePostSchema.safeParse(req.query);

  if (!response.success) {
    return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
  }

  const { postId } = response.data;

  const postIDToNum = parseInt(postId);

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postIDToNum,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    const isAbleToDelete = post?.author_id === session?.user?.id || user?.role === 'ADMIN';

    if (!isAbleToDelete) {
      res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
      return;
    }

    await prisma.post.deleteMany({
      where: {
        id: postIDToNum,
      },
    });

    const images = [post?.image1, post?.image2, post?.image3];

    await Promise.all(
      images.map(async (el) => {
        if (!el) {
          return;
        }

        const postImage = await prisma.postImage.findFirst({
          where: {
            id: el,
          },
        });

        if (postImage?.fileId) {
          await imageKit.deleteFile(postImage?.fileId);
        }
      }),
    );

    res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
  } catch (error) {
    res.status(httpCodes.forbidden).send(responseMessages.forbidden);
  }
};
