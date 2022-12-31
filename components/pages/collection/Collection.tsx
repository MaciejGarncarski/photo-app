import { NextSeo } from 'next-seo';

import styles from './collection.module.scss';

import { Heading } from '@/components/atoms/heading/Heading';
import { HomepagePost } from '@/components/organisms/homepagePost/HomepagePost';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useCollection } from '@/components/pages/collection/useCollection';

export const Collection = () => {
  const { session } = useAuth();

  const { data } = useCollection({ userID: session?.user?.id ?? '' });

  if (!data) {
    return null;
  }

  return (
    <main className={styles.container}>
      <NextSeo title='Post collection' />
      <Heading tag='h2' className={styles.heading}>
        Your post collection
      </Heading>
      {data.pages.map((page) => {
        return page.posts.map((post) => {
          return <HomepagePost key={post.id} post={post} />;
        });
      })}
    </main>
  );
};
