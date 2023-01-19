import { GetStaticProps } from 'next';

import { PrefetchedPostData, prefetchPosts } from '@/utils/prefetchPosts';

import { Home } from '@/components/pages/home/Home';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

type HomeProps = {
  initialData?: InfinitePosts<PrefetchedPostData>;
};

const HomePage = ({ initialData }: HomeProps) => {
  return <Home initialData={initialData} />;
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await prefetchPosts();

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
