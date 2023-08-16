'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useModal } from '@/src/hooks/use-modal';
import { useUser } from '@/src/hooks/use-user';

import { Loader } from '@/src/components/loader/loader';
import { usePost } from '@/src/components/pages/account/use-post';
import { PostModal } from '@/src/components/post/post-modal/post-modal';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './post-by-id.module.scss';

export const PostById = () => {
  const params = useParams();
  const postId = parseInt(params?.postId as string);
  const postModal = useModal(true);
  const { data, isSuccess, isError } = usePost({ postId });
  const { data: authorData } = useUser({ userId: data?.authorId || '' });

  const postModalClose = () => {
    postModal.closeModal();
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
    <PostModal
      isVisible={postModal.isModalOpen}
      postId={postId}
      closeModal={postModalClose}
    />
  );
};
