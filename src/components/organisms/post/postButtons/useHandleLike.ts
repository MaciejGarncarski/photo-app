import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/useAuth';
import { PostData } from '@/src/utils/apis/transformPost';
import { InfinitePostsQuery, updatePostQuery } from '@/src/utils/updatePostQuery';

import { usePostLike } from '@/src/components/organisms/post/postButtons/usePostLike';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/useInfinitePosts';

const TIMEOUT = 1000;

type PropsTypes = {
  post: PostData;
};

export const useHandleLike = ({ post }: PropsTypes) => {
  const [isLikeAnimationShown, setIsLikeAnimationShown] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isSignedIn } = useAuth();
  const { isLiked, postId } = post;
  const postLikeMutation = usePostLike();
  const queryClient = useQueryClient();

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

    updatePostQuery({ queryClient, post });
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
