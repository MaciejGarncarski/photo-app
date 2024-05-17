import type { SortOption } from '@/components/post/post-comments/use-sort';
import type { Comment } from '@/schemas/post-comment.schema';

export const sortComments = (
  a: Comment,
  b: Comment,
  sortOption: SortOption,
) => {
  if (sortOption === 'likes') {
    return a.likesCount > b.likesCount ? -1 : 1;
  }

  if (sortOption === 'newest') {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ? 1
      : -1;
  }

  if (sortOption === 'oldest') {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ? -1
      : 1;
  }

  return 1;
};
