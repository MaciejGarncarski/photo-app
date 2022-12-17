import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';
import { infinitePostsCount } from '@/utils/infinitePostsCount';
import { string } from '@/utils/string';

import { PostData } from '@/components/pages/collection/useCollection';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { InfinitePosts } from '@/pages/api/post/infinitePosts';

const POSTS_PER_SCROLL = 9;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method !== 'GET') {
    res.status(405).send({ status: 405, error: 'Invalid metod' });
    return;
  }

  const { skip, user } = req.query;
  if (typeof user !== 'string') {
    res.status(404).send({ status: 'not found' });
    return;
  }

  const skipNumber = parseInt(string(skip));
  const takeNumber = POSTS_PER_SCROLL;

  try {
    const posts = await prisma.post.findMany({
      skip: skipNumber * takeNumber,
      take: takeNumber,

      where: {
        author_id: user,
      },

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

    const { postsCount, nextCursor } = infinitePostsCount({ count: _count.id, skipNumber });

    const transformedPosts = posts.map((post) => {
      return {
        ...post,
        likesCount: post._count.posts_likes,
        commentsCount: post._count.posts_comments,
      };
    });

    const response: InfinitePosts<PostData> = {
      posts: transformedPosts,
      postsCount,
      cursor: nextCursor,
    };

    res.status(200).send(response);
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
