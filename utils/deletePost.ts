import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { imageKit } from '@/lib/imagekit';
import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';
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

    if (post?.file_id) {
      await imageKit.deleteFile(post?.file_id);
    }

    await res.revalidate('/');
    res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
  } catch (error) {
    res.status(httpCodes.forbidden).send(responseMessages.forbidden);
  }
};
