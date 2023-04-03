import { InfiniteData, QueryClient } from '@tanstack/react-query';

import { PostData } from '@/src/utils/apis/transformPost';
import { updateInfinitePostsLike } from '@/src/utils/apis/updateInfinitePostsLike';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/useInfinitePosts';
import { InfinitePosts } from '@/src/pages/api/post/infinitePosts';

export type InfinitePostsQuery = InfiniteData<InfinitePosts<PostData>>;

type Types = {
  queryClient: QueryClient;
  post: PostData;
};

export const updatePostQuery = ({ queryClient, post }: Types) => {
  queryClient.setQueryData<PostData>(['post', post.postId], (oldPost) => {
    if (!oldPost) {
      return;
    }

    if (oldPost.isLiked) {
      return {
        ...oldPost,
        isLiked: false,
        likesCount: (oldPost?.likesCount ?? 0) - 1,
      };
    }

    return {
      ...oldPost,
      isLiked: true,
      likesCount: (oldPost?.likesCount ?? 0) + 1,
    };
  });

  queryClient.setQueryData<InfinitePostsQuery>(HOME_POSTS_QUERY_KEY, (oldData) =>
    updateInfinitePostsLike(oldData, post),
  );
};
