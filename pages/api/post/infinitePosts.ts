import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const POSTS_PER_SCROLL = 4;

export type InfinitePosts<T> = {
  posts: Array<T>;
  postsCount: number;
  cursor: number | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send({ status: 405, error: 'Invalid metod' });
    return;
  }
  const { skip } = req.query;
  const session = await unstable_getServerSession(req, res, authOptions);
  const isSignedUp = Boolean(session?.user?.id);

  const skipNumber = parseInt(string(skip));
  const takeNumber = POSTS_PER_SCROLL;

  try {
    const posts = await prisma.post.findMany({
      skip: skipNumber * takeNumber,
      take: takeNumber,

      include: {
        author: true,
        _count: {
          select: {
            posts_likes: true,
            posts_comments: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    const { _count } = await prisma.post.aggregate({
      _count: {
        id: true,
      },
    });

    const postsCount = _count.id;
    const canLoadMore = postsCount > (skipNumber + 1) * POSTS_PER_SCROLL;
    const nextCursor = canLoadMore ? skipNumber + 1 : null;

    const postsWithCollectionData = await Promise.all(
      posts.map(async (post) => {
        const isInCollection = await prisma.collection.findFirst({
          where: {
            post_id: post.id,
            user_id: session?.user?.id,
          },
        });

        return {
          ...post,
          likesCount: post._count.posts_likes,
          commentsCount: post._count.posts_comments,
          isInCollection: isSignedUp ? Boolean(isInCollection) : false,
        };
      }),
    );

    if (session) {
      const postsWithLikesData = await Promise.all(
        postsWithCollectionData.map(async (post) => {
          const like = await prisma.postLike.findFirst({
            where: {
              post_id: post.id,
              user_id: session.user?.id,
            },
          });

          return { ...post, isLiked: Boolean(like) };
        }),
      );

      res.status(200).send({ posts: postsWithLikesData, postsCount, cursor: nextCursor });
      return;
    }

    res.status(200).send({ posts: postsWithCollectionData, postsCount, cursor: nextCursor });
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
