import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useUser } from '@/src/hooks/useUser';
import { unlock } from '@/src/utils/bodyLock';
import { formatDate } from '@/src/utils/formatDate';

import { useDeletePost } from '@/src/components/organisms/post/postOptions/useDeletePost';

type Arguments = {
  authorId: string;
  createdAt: Date;
  postId: number;
};

export const usePostHeader = ({ authorId, createdAt, postId }: Arguments) => {
  const { data } = useUser({ userId: authorId });
  const { session } = useAuth();
  const menuModal = useModal();
  const confirmationModal = useModal();
  const deletePostMutation = useDeletePost();

  const dateFromNow = formatDate(createdAt);

  const isAuthor = session?.user?.id === authorId;

  const onSettled = () => {
    confirmationModal.closeModal();
    menuModal.closeModal();
    unlock();
  };

  const handleDeletePost = () => {
    toast.promise(deletePostMutation.mutateAsync({ postId }, { onSettled }), {
      error: 'Error!',
      loading: 'Deleting post...',
      success: 'Deleted!',
    });
  };

  return { username: data?.username, handleDeletePost, isAuthor, dateFromNow, confirmationModal, menuModal };
};
