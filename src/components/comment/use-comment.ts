import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';
import { formatDate } from '@/src/utils/format-date';

import { useDeleteComment } from '@/src/components/comment/use-delete-comment';
import { useCommentLike } from '@/src/components/comment/use-like';
import { Comment } from '@/src/schemas/post-comment';

type Arguments = {
  commentData: Comment;
};

export const useComment = ({ commentData }: Arguments) => {
  const { sessionUser } = useAuth();
  const { isLiked, commentId, text, createdAt, authorId, likesCount } =
    commentData;
  const { data: sessionUserData } = useUser({ userId: sessionUser?.id || '' });
  const { data } = useUser({ userId: authorId });
  const timeSinceCreated = formatDate(createdAt);

  const commentLike = useCommentLike();
  const commentDelete = useDeleteComment();
  const handleLike = () => {
    commentLike.mutate({ commentId: commentId.toString(), isLiked });
  };

  const handleDelete = () =>
    commentDelete.mutate({ commentId: commentId.toString() });

  const isAbleToDelete = sessionUserData?.id === authorId;
  const userAccountHref = `/${data?.username}`;

  return {
    isLiked,
    text,
    likesCount,
    timeSinceCreated,
    handleDelete,
    handleLike,
    isAbleToDelete,
    userAccountHref,
    username: data?.username || '',
  };
};
