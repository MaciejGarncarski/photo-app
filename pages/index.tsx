import { dehydrate, QueryClient } from '@tanstack/react-query';

import { prisma } from '@/lib/prismadb';
import { fetchAccount } from '@/hooks/useUser';

import { Home } from '@/components/pages/home/Home';
import { fetchInfinitePosts, HOME_POSTS_QUERY_KEY } from '@/components/pages/home/useInfinitePosts';

const HomePage = () => {
  return <Home />;
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  try {
    const postsData = await prisma.post.findMany({
      skip: 0,
      take: 3,

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

    await queryClient.prefetchInfiniteQuery(HOME_POSTS_QUERY_KEY, () =>
      fetchInfinitePosts({ pageParam: 0, isPrefetching: true }),
    );

    await Promise.all(
      postsData.map(async (post) => {
        await queryClient.prefetchQuery(['account', post.author_id, null], () =>
          fetchAccount({ userId: post.author_id, isPrefetching: true }),
        );
      }),
    );

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default HomePage;
