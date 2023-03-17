import { dehydrate, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { prisma } from '@/lib/prismadb';
import { fetchAccount } from '@/hooks/useUser';

import { Home } from '@/components/pages/home/Home';

dayjs.extend(relativeTime);

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
