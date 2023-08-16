import { InfiniteData, QueryClient } from '@tanstack/react-query';

import { Post, PostDetails, PostsResponse } from '@/src/schemas/post.schema';

export type InfinitePostsQuery = InfiniteData<PostsResponse>;

type Types = {
  queryClient: QueryClient;
  post: Post;
};

export const updatePostQuery = ({ queryClient, post }: Types) => {
  queryClient.setQueryData<PostDetails>(['post', post.id], (oldPost) => {
    if (!oldPost) {
      return;
    }

    return {
      ...oldPost,
      isLiked: !oldPost.isLiked,
      likesCount: (oldPost?.likesCount ?? 0) + (oldPost.isLiked ? -1 : 1),
    };
  });
};
