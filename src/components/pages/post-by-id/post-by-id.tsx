import Link from 'next/link';
import { useRouter } from 'next/router';

import { useModal } from '@/src/hooks/useModal';
import { useUser } from '@/src/hooks/useUser';

import { Heading } from '@/src/components/atoms/heading/Heading';

import { Loader } from '@/src/components/molecules/loader/Loader';

import { PostModal } from '@/src/components/organisms/postModal/PostModal';

import { Account } from '@/src/components/pages/account/Account';
import { usePost } from '@/src/components/pages/account/usePost';

import styles from './PostById.module.scss';

export const PostById = () => {
  const router = useRouter();
  const postId = parseInt(router.query.id as string);
  const postModal = useModal(true);
  const { data, isSuccess, isError } = usePost({ postId });
  const { data: authorData } = useUser({ userId: data?.authorId || '' });

  const postModalClose = () => {
    postModal.closeModal();
    router.replace(`/${authorData?.username}`);
  };

  if (isError || Number.isNaN(postId)) {
    return (
      <div className={styles.error}>
        <Heading tag="h2" size="big">
          Post not found.
        </Heading>
        <Link href="/" className={styles.link}>
          Go back to homepage.
        </Link>
      </div>
    );
  }

  if (!isSuccess || !authorData?.username) {
    return <Loader marginTop color="blue" size="normal" />;
  }

  return (
    <>
      <PostModal
        isVisible={postModal.isModalOpen}
        post={data}
        closeModal={postModalClose}
      />
      <Account username={authorData.username} />
    </>
  );
};
