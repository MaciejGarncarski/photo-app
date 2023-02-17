import { dehydrate, QueryClient } from '@tanstack/react-query';

import { Home } from '@/components/pages/home/Home';
import { fetchInfinitePosts } from '@/components/pages/home/useInfinitePosts';

const HomePage = () => {
  return <Home />;
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(['homepage infinite posts'], () =>
    fetchInfinitePosts({ isPrefetching: true, pageParam: 0 }),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};

export default HomePage;
