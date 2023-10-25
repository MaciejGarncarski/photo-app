import { useModal } from '@/src/hooks/use-modal';
import { useUser } from '@/src/hooks/use-user';
import { formatDateRelative } from '@/src/utils/format-date-relative';

import { usePost } from '@/src/components/pages/account/use-post';
import { useDeletePost } from '@/src/components/post/post-options/use-delete-post';

type Arguments = {
  authorId?: string;
  createdAt?: string;
  postId: number;
};

export const usePostHeader = ({ authorId, createdAt, postId }: Arguments) => {
  const { data } = useUser({ userId: authorId || '' });
  const menuModal = useModal();
  const confirmationModal = useModal();
  const deletePostMutation = useDeletePost();
  const { data: postData } = usePost({ postId });

  const dateFromNow = createdAt ? formatDateRelative(createdAt) : '';

  const handleDeletePost = () => {
    deletePostMutation.mutate(
      { postId: postId.toString() },
      {
        onSettled: () => {
          confirmationModal.closeModal();
          menuModal.closeModal();
        },
      },
    );
  };

  return {
    username: data?.username,
    handleDeletePost,
    dateFromNow,
    confirmationModal,
    menuModal,
    postData,
    deletePostMutation,
  };
};
