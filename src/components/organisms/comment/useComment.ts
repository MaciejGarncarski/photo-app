import { useAuth } from '@/src/hooks/useAuth';
import { useUser } from '@/src/hooks/useUser';
import { formatDate } from '@/src/utils/formatDate';

import { useCommentLike } from '@/src/components/organisms/comment/useCommentLike';
import { useDeleteComment } from '@/src/components/organisms/comment/useDeleteComment';
import { PostComment } from '@/src/components/organisms/postComments/useInfiniteComments';

type Arguments = {
  commentData: PostComment;
};

export const useComment = ({ commentData }: Arguments) => {
  const { session } = useAuth();
  const { isLiked, id, commentText, createdAt, userId, likesCount } = commentData;
  const { data: sessionUserData } = useUser({ userId: session?.user?.id || '' });
  const { data } = useUser({ userId });
  const timeSinceCreated = formatDate(createdAt);

  const commentLike = useCommentLike({ commentId: id });
  const commentDelete = useDeleteComment();
  const handleLike = () => commentLike.mutate();
  const handleDelete = () => commentDelete.mutate({ commentId: id });

  const isAbleToDelete = sessionUserData?.id === userId;
  const userAccountHref = `/${data?.username}`;

  return {
    isLiked,
    commentText,
    likesCount,
    timeSinceCreated,
    handleDelete,
    handleLike,
    isAbleToDelete,
    userAccountHref,
    username: data?.username || '',
  };
};
