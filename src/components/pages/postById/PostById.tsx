import { useRouter } from 'next/router';

import { useModal } from '@/src/hooks/useModal';
import { useUser } from '@/src/hooks/useUser';

import { Loader } from '@/src/components/molecules/loader/Loader';

import { PostModal } from '@/src/components/organisms/postModal/PostModal';

import { Account } from '@/src/components/pages/account/Account';
import { usePost } from '@/src/components/pages/account/usePost';

export const PostById = () => {
  const router = useRouter();
  const postId = parseInt(router.query.id as string);
  const postModal = useModal(true);
  const { data, isSuccess } = usePost({ postId });
  const { data: authorData } = useUser({ userId: data?.authorId || '' });

  const postModalClose = () => {
    postModal.closeModal();
    router.replace(`/${authorData?.username}`);
  };

  if (!isSuccess || !authorData?.username) {
    return <Loader color="blue" size="normal" />;
  }

  return (
    <>
      <PostModal isVisible={postModal.isModalOpen} post={data} closeModal={postModalClose} />
      <Account username={authorData.username} />
    </>
  );
};
