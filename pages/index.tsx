import { dehydrate, QueryClient } from '@tanstack/react-query';

import { prisma } from '@/lib/prismadb';

import { fetchAccount } from '@/components/pages/account/useAccount';
import { Home } from '@/components/pages/home/Home';
import { fetchInfinitePosts } from '@/components/pages/home/useInfinitePosts';

const HomePage = () => {
  return <Home />;
};

export const getServerSideProps = async () => {
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

    postsData.forEach(async (post) => {
      await queryClient.prefetchQuery(['account', post.author_id], () => fetchAccount({ userId: post.author_id }));
    });

    await queryClient.prefetchInfiniteQuery(['homepage infinite posts'], fetchInfinitePosts);

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
