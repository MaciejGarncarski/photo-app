import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/use-user';

import { usePost } from '@/components/pages/account/use-post';

type UsePostModalArgs = {
  closeModal: () => void;
  isPostPage: boolean;
  postId: number;
};

export const usePostModal = ({
  closeModal,
  isPostPage,
  postId,
}: UsePostModalArgs) => {
  const postQuery = usePost({ postId });
  const authorQuery = useUser({ userId: postQuery.data?.authorId || '' });
  const router = useRouter();

  const handleClose = () => {
    closeModal();
    if (isPostPage) {
      router.replace(`/${authorQuery.data?.username}`);
    }
  };

  return { handleClose };
};
