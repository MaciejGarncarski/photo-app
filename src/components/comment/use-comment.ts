import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';
import { formatDateRelative } from '@/src/utils/format-date-relative';

import { useDeleteComment } from '@/src/components/comment/use-delete-comment';
import { useCommentLike } from '@/src/components/comment/use-like';
import { Comment } from '@/src/schemas/post-comment.schema';

type Arguments = {
  commentData: Comment;
};

export const useComment = ({ commentData }: Arguments) => {
  const { sessionUser } = useAuth();
  const { isLiked, commentId, createdAt, authorId } = commentData;
  const { data: sessionUserData } = useUser({ userId: sessionUser?.id || '' });
  const { data } = useUser({ userId: authorId });
  const timeSinceCreated = formatDateRelative(createdAt);

  const commentLike = useCommentLike();
  const commentDelete = useDeleteComment();
  const handleLike = () => {
    commentLike.mutate({ commentId: commentId.toString(), isLiked });
  };

  const handleDelete = () =>
    commentDelete.mutate({ commentId: commentId.toString() });

  const isAbleToDelete = sessionUserData?.userId === authorId;
  const userAccountHref = `/${data?.username}`;

  return {
    timeSinceCreated,
    handleDelete,
    handleLike,
    isAbleToDelete,
    userAccountHref,
    isDeleting: commentDelete.isPending,
    username: data?.username || '',
  };
};
