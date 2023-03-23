import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';
import { PostData } from '@/utils/apis/transformPost';
import { updateInfinitePostsLike } from '@/utils/apis/updateInfinitePostsLike';

import { usePostLike } from '@/components/molecules/post/postButtons/usePostLike';
import { HOME_POSTS_QUERY_KEY } from '@/components/pages/home/useInfinitePosts';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

const TIMEOUT = 1000;

type PropsTypes = {
  post: PostData;
};

type InfinitePostsQuery = InfiniteData<InfinitePosts<PostData>>;

export const useHandleLike = ({ post }: PropsTypes) => {
  const [isLikeAnimationShown, setIsLikeAnimationShown] = useState<boolean>(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const postLikeMutation = usePostLike();
  const { isSignedIn } = useAuth();
  const queryClient = useQueryClient();
  const { isLiked, postId } = post;

  const handleLike = () => {
    if (!isSignedIn) {
      return toast.error('Sign in first.');
    }

    const oldPostsList = queryClient.getQueryData<InfinitePostsQuery>(HOME_POSTS_QUERY_KEY);
    const oldPost = queryClient.getQueryData<PostData>(['post', postId]);

    postLikeMutation.mutate(
      { postId: postId.toString() },
      {
        onError: () => {
          queryClient.setQueryData<PostData>(['post', postId], oldPost);
          queryClient.setQueryData<InfinitePostsQuery>(HOME_POSTS_QUERY_KEY, oldPostsList);
        },
      },
    );
    queryClient.setQueryData<PostData>(['post', postId], (oldPost) => {
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

  const handleLikeWithAnimation = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (!isLiked) {
      handleLike();
    }

    if (isSignedIn) {
      setIsLikeAnimationShown(true);
      timeoutId.current = setTimeout(() => {
        setIsLikeAnimationShown(false);
      }, TIMEOUT);
    }
  };

  return { handleLike, handleLikeWithAnimation, isLikeAnimationShown };
};
