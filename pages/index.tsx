import { GetStaticProps } from 'next';

import { prisma } from '@/lib/prismadb';

import { PostData } from '@/components/pages/collection/useCollection';
import { Home } from '@/components/pages/home/Home';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

export const APP_NAME = 'PhotoApp';

type HomeProps = {
  initialData?: InfinitePosts<PostData>;
};

const HomePage = ({ initialData }: HomeProps) => {
  return <Home initialData={initialData} />;
};

export const getStaticProps: GetStaticProps = async () => {
  try {
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

    const transformedPosts = posts.map((post) => {
      return {
        ...post,
        likesCount: post._count.posts_likes,
        commentsCount: post._count.posts_comments,
        isLiked: false,
        isInCollection: false,
      };
    });

    const data: InfinitePosts<PostData> = {
      posts: transformedPosts,
      postsCount,
      cursor: nextCursor,
    };

    return {
      props: {
        initialData: JSON.parse(JSON.stringify(data)),
      },
      revalidate: 120,
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default HomePage;
