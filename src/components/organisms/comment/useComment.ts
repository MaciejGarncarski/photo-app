import { useAuth } from '@/src/hooks/useAuth';
import { useUser } from '@/src/hooks/useUser';
import { formatDate } from '@/src/utils/formatDate';

import { useCommentLike } from '@/src/components/organisms/comment/useCommentLike';
import { useDeleteComment } from '@/src/components/organisms/comment/useDeleteComment';

import { Comment } from '@/src/schemas/post-comment';

type Arguments = {
  commentData: Comment;
};

export const useComment = ({ commentData }: Arguments) => {
  const { sessionUser } = useAuth();
  const { isLiked, commentId, commentText, createdAt, authorId, likesCount } =
    commentData;
  const { data: sessionUserData } = useUser({ userId: sessionUser?.id || '' });
  const { data } = useUser({ userId: authorId });
  const timeSinceCreated = formatDate(createdAt);

  const commentLike = useCommentLike();
  const commentDelete = useDeleteComment();
  const handleLike = () => commentLike.mutate({ commentId, isLiked });
  const handleDelete = () => commentDelete.mutate({ commentId });

  const isAbleToDelete = sessionUserData?.id === authorId;
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
