import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';
import { infinitePostsCount } from '@/utils/infinitePostsCount';
import { string } from '@/utils/string';
import { transformCollectionPost } from '@/utils/transformCollectionPost';

import { PostData } from '@/components/pages/collection/useCollection';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { InfinitePosts } from '@/pages/api/post/infinitePosts';

const COLLECTION_POSTS_PER_SCROLL = 9;

const apiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send({ status: 'unauthorized' });
    return;
  }

  if (method === 'DELETE') {
    try {
      const { postID } = req.query;
      await prisma.collection.deleteMany({
        where: {
          post_id: Number(string(postID)),
          user_id: session.user?.id,
        },
      });

      res.status(200).send({ status: 'resource updated successfully' });
    } catch (error) {
      res.status(400).send({ status: 'error', message: 'Cannot remove post from your collection' });
    }
  }

  if (method === 'PUT') {
    try {
      const { userID, postID } = req.body;
      await prisma.collection.create({
        data: {
          post_id: postID,
          user_id: userID,
        },
      });

      res.status(201).send({ status: 'resource updated successfully' });
    } catch (error) {
      res.status(400).send({ status: 'error', message: 'Cannot add post to your collection' });
    }
  }

  if (method === 'GET') {
    const { skip, user } = req.query;
    const skipNumber = parseInt(string(skip));
    const takeNumber = COLLECTION_POSTS_PER_SCROLL;

    try {
      const posts = await prisma.collection.findMany({
        skip: skipNumber * takeNumber,
        take: takeNumber,

        where: {
          user_id: string(user),
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

      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({ status: 'error', message: 'Cannot download your collection' });
    }
  }
};

export default apiHandler;
