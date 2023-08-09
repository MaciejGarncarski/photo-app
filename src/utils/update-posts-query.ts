import { InfiniteData, QueryClient } from '@tanstack/react-query';

import { updateInfinitePostsLike } from '@/src/utils/update-infinite-posts-like';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-posts';
import { Post, PostsResponse } from '@/src/schemas/post.schema';

export type InfinitePostsQuery = InfiniteData<PostsResponse>;

type Types = {
  queryClient: QueryClient;
  post: Post;
};

export const updatePostQuery = ({ queryClient, post }: Types) => {
  queryClient.setQueryData<Post>(['post', post.id], (oldPost) => {
    if (!oldPost) {
      return;
    }

    return {
      ...oldPost,
      isLiked: !oldPost.isLiked,
      likesCount: (oldPost?.likesCount ?? 0) + (oldPost.isLiked ? -1 : 1),
    };
  });

  queryClient.setQueryData<InfinitePostsQuery>(
    HOME_POSTS_QUERY_KEY,
    (oldData) => updateInfinitePostsLike(oldData, post),
  );
};
