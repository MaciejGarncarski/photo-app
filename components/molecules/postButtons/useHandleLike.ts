import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import { PostData } from '@/utils/transformPost';
import { updateInfinitePostsLike } from '@/utils/updateInfinitePostsLike';

import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
import { HOME_POSTS_QUERY_KEY } from '@/components/pages/home/useInfinitePosts';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

type PropsTypes = {
  post: PostData;
};

export const useHandleLike = ({ post }: PropsTypes) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postLikeMutation = usePostLike();
  const { session } = useAuth();

  const handleLike = () => {
    if (!session?.user?.id) {
      router.push('/auth/signin');
      return;
    }

    const oldPosts = queryClient.getQueryData<InfiniteData<InfinitePosts<PostData>>>(HOME_POSTS_QUERY_KEY);
    const oldPost = queryClient.getQueryData<PostData>(['post', post.postId]);

    postLikeMutation.mutate(
      { postId: post.postId.toString() },
      {
        onError: () => {
          queryClient.setQueryData<PostData>(['post', post.postId], oldPost);
          queryClient.setQueryData<InfiniteData<InfinitePosts<PostData>>>(HOME_POSTS_QUERY_KEY, oldPosts);
        },
      },
    );
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

    queryClient.setQueryData<InfiniteData<InfinitePosts<PostData>>>(HOME_POSTS_QUERY_KEY, (oldData) =>
      updateInfinitePostsLike(oldData, post),
    );
  };

  return { handleLike };
};
