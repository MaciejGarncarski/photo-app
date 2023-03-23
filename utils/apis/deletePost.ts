import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { imageKit } from '@/lib/imagekit';
import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';
import { string } from '@/utils/string';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

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

  const postIDToNum = Number(string(postId));

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