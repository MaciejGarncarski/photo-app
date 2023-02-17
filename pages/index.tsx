import { dehydrate, QueryClient } from '@tanstack/react-query';

import { prisma } from '@/lib/prismadb';
import { fetchAccount } from '@/hooks/useUser';

import { Home } from '@/components/pages/home/Home';
import { fetchInfinitePosts } from '@/components/pages/home/useInfinitePosts';

const HomePage = () => {
  return <Home />;
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  try {
    const postsData = await prisma.post.findMany({
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

    await queryClient.prefetchInfiniteQuery(['homepage infinite posts'], () =>
      fetchInfinitePosts({ isPrefetching: true, pageParam: 0 }),
    );

    await Promise.all(
      postsData.map(async (post) => {
        await queryClient.prefetchQuery(['account', post.author_id], () =>
          fetchAccount({ userId: post.author_id, isPrefetching: true }),
        );
      }),
    );

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
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
