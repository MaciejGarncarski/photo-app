import { toast } from 'react-hot-toast';

import { useModal } from '@/src/hooks/use-modal';
import { useUser } from '@/src/hooks/use-user';
import { formatDate } from '@/src/utils/format-date';

import { useDeletePost } from '@/src/components/post/post-options/use-delete-post';

type Arguments = {
  authorId: string;
  createdAt: string;
  postId: number;
};

export const usePostHeader = ({ authorId, createdAt, postId }: Arguments) => {
  const { data } = useUser({ userId: authorId });
  const menuModal = useModal();
  const confirmationModal = useModal();
  const deletePostMutation = useDeletePost();

  const dateFromNow = formatDate(createdAt);

  const onSettled = () => {
    confirmationModal.closeModal();
    menuModal.closeModal();
  };

  const handleDeletePost = () => {
    toast.promise(deletePostMutation.mutateAsync({ postId }, { onSettled }), {
      error: 'Error!',
      loading: 'Deleting post...',
      success: 'Deleted!',
    });
  };

  return {
    username: data?.username,
    handleDeletePost,
    dateFromNow,
    confirmationModal,
    menuModal,
    deletePostMutation,
  };
};
