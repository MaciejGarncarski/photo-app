import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { imageKit } from '@/lib/imagekit';
import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { postID } = req.query;
  const postIDToNum = Number(string(postID));

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
      res.status(401).send({ status: 'unauthorized' });
      return;
    }

    if (post?.file_id) {
      await imageKit.deleteFile(post?.file_id);
    }

    await prisma.postComment.deleteMany({
      where: {
        post_id: postIDToNum,
      },
    });

    await prisma.postLike.deleteMany({
      where: {
        post_id: postIDToNum,
      },
    });

    await prisma.savedPost.deleteMany({
      where: {
        post_id: postIDToNum,
      },
    });

    await prisma.collection.deleteMany({
      where: {
        post_id: postIDToNum,
      },
    });

    await prisma.post.deleteMany({
      where: {
        id: postIDToNum,
      },
    });
    res.status(200).send({ status: 'ok' });
  } catch (error) {
    res.status(400).send({ status: 'error' });
  }
};
