import { prisma } from '@/lib/prismadb';
import { getMoreUserData } from '@/utils/getMoreUserData';

import { Account } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

export type PrefetchedPostData = PostData & {
  authorData?: Account;
};

export const prefetchPosts = async () => {
  const posts = await prisma.post.findMany({
    skip: 0,
    take: 9,

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
  const canLoadMore = postsCount > (0 + 1) * 9;
  const nextCursor = canLoadMore ? 0 + 1 : null;

  const transformedPosts = await Promise.all(
    posts.map(async (post) => {
      const author = await prisma.user.findFirst({
        where: {
          id: post.author.id,
        },
      });

      const { count, isFollowing } = await getMoreUserData(author?.id ?? '');
      const authorData: Account = { user: author, count, isFollowing: Boolean(isFollowing) };

      return {
        ...post,
        authorData,
        likesCount: post._count.posts_likes,
        commentsCount: post._count.posts_comments,
        isLiked: false,
        isInCollection: false,
      };
    }),
  );

  const data: InfinitePosts<PrefetchedPostData> = {
    posts: transformedPosts,
    postsCount,
    cursor: nextCursor,
  };

  console.log(data);
  return data;
};
