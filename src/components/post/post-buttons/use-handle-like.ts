'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/use-auth';
import {
  InfinitePostsQuery,
  updatePostQuery,
} from '@/src/utils/update-posts-query';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-posts';
import { usePostLike } from '@/src/components/post/post-buttons/use-post-like';
import { Post } from '@/src/schemas/post.schema';

const TIMEOUT = 1000;

type Props = {
  post: Post;
};

export const useHandleLike = ({ post }: Props) => {
  const [isLikeAnimationShown, setIsLikeAnimationShown] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isSignedIn } = useAuth();
  const postLikeMutation = usePostLike();
  const queryClient = useQueryClient();
  const { isLiked, id: postId } = post;

  const handleLike = () => {
    if (!isSignedIn) {
      return toast.error('Sign in first.');
    }

    const oldPostsList =
      queryClient.getQueryData<InfinitePostsQuery>(HOME_POSTS_QUERY_KEY);
    const oldPost = queryClient.getQueryData<Post>(['post', postId]);

    postLikeMutation.mutate(
      { postId, isLiked },
      {
        onError: () => {
          queryClient.setQueryData<Post>(['post', postId], oldPost);
          queryClient.setQueryData<InfinitePostsQuery>(
            HOME_POSTS_QUERY_KEY,
            oldPostsList,
          );
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
