import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useUser } from '@/src/hooks/useUser';
import { formatDate } from '@/src/utils/formatDate';

import { useDeletePost } from '@/src/components/organisms/post/postOptions/useDeletePost';

type Arguments = {
  authorId: string;
  createdAt: string;
  postId: number;
};

export const usePostHeader = ({ authorId, createdAt, postId }: Arguments) => {
  const { data } = useUser({ userId: authorId });
  const { sessionUser } = useAuth();
  const menuModal = useModal();
  const confirmationModal = useModal();
  const deletePostMutation = useDeletePost();

  const dateFromNow = formatDate(createdAt);

  const isAuthor = sessionUser?.id === authorId;

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
    isAuthor,
    dateFromNow,
    confirmationModal,
    menuModal,
  };
};
