import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';
import { PostData, transformPost } from '@/utils/apis/transformPost';
import { getInfinitePostsCount } from '@/utils/getInfinitePostsCount';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

import { prisma } from '../../../../../prisma/prismadb';

const POSTS_PER_SCROLL = 9;

const InfinitePostsSchema = z.object({
  skip: z.string(),
  userId: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = InfinitePostsSchema.safeParse(req.query);

  if (!response.success) {
    return res.status(httpCodes.badRequest).send({
      message: responseMessages.badRequest,
    });
  }

  if (req.method !== 'GET') {
    res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
    return;
  }

  const { skip, userId } = response.data;
  const skipNumber = parseInt(skip);
  const takeNumber = POSTS_PER_SCROLL;

  try {
    const posts = await prisma.post.findMany({
      skip: skipNumber * takeNumber,
      take: takeNumber,

      where: {
        author_id: userId,
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

    const { postsCount, nextCursor } = getInfinitePostsCount({ count: _count.id, skipNumber });

    const transformedPosts = await Promise.all(
      posts.map(async (post) => {
        return await transformPost(post);
      }),
    );

    const response: InfinitePosts<PostData> = {
      posts: transformedPosts,
      postsCount,
      cursor: nextCursor,
    };

    res.status(httpCodes.success).send(response);
  } catch (e) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default handler;
