import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';
import { infinitePostsCount } from '@/utils/infinitePostsCount';
import { string } from '@/utils/string';
import { transformCollectionPost } from '@/utils/transformCollectionPost';

import { PostData } from '@/components/pages/collection/useCollection';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { InfinitePosts } from '@/pages/api/post/infinitePosts';

const COLLECTION_POSTS_PER_SCROLL = 9;

const DeleteCollectionSchema = z.object({
  postId: z.string(),
});

export const PutCollectionSchema = z.object({
  userId: z.string(),
  postId: z.string(),
});

const GetCollectionSchema = z.object({
  skip: z.string(),
  userId: z.string(),
});

const apiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send({ status: 'unauthorized' });
    return;
  }

  if (method === 'DELETE') {
    const response = DeleteCollectionSchema.safeParse(req.query);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send({
        message: responseMessages.badRequest,
      });
    }

    try {
      const { postId } = response.data;
      await prisma.collection.deleteMany({
        where: {
          post_id: Number(string(postId)),
          user_id: session.user?.id,
        },
      });

      res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
    } catch (error) {
      res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
  }

  if (method === 'PUT') {
    const response = PutCollectionSchema.safeParse(req.body);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send({
        message: responseMessages.badRequest,
      });
    }
    try {
      const { userId, postId } = response.data;

      await prisma.collection.create({
        data: {
          post_id: Number(postId),
          user_id: userId,
        },
      });

      res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
    } catch (error) {
      res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
  }

  if (method === 'GET') {
    const response = GetCollectionSchema.safeParse(req.query);

    if (!response.success) {
      return res.status(httpCodes.badRequest).send({
        message: responseMessages.badRequest,
      });
    }

    const { skip, userId } = response.data;
    const skipNumber = Number(string(skip));

    try {
      const posts = await prisma.collection.findMany({
        skip: skipNumber * COLLECTION_POSTS_PER_SCROLL,
        take: COLLECTION_POSTS_PER_SCROLL,

        where: {
          user_id: userId,
        },

        include: {
          post: {
            include: {
              author: true,
              _count: {
                select: {
                  posts_likes: true,
                  posts_comments: true,
                },
              },
            },
          },
        },

        orderBy: {
          id: 'desc',
        },
      });

      const { _count } = await prisma.collection.aggregate({
        where: {
          user_id: session.user?.id,
        },
        _count: {
          id: true,
        },
      });

      const postsWithCount = await Promise.all(
        posts.map((collectionPost) => transformCollectionPost({ collectionPost, session })),
      );

      const { postsCount, nextCursor } = infinitePostsCount({ count: _count.id, skipNumber });

      const response: InfinitePosts<PostData> = {
        posts: postsWithCount,
        postsCount,
        cursor: nextCursor,
      };

      res.status(httpCodes.success).send(response);
    } catch (error) {
      res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
  }
};

export default apiHandler;
