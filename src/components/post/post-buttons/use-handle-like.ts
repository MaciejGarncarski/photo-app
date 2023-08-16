'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/use-auth';
import { updatePostQuery } from '@/src/utils/update-posts-query';

import { usePost } from '@/src/components/pages/account/use-post';
import { usePostLike } from '@/src/components/post/post-buttons/use-post-like';
import { Post } from '@/src/schemas/post.schema';

const TIMEOUT = 1000;

type Props = {
  postId: number;
  isLiked: boolean;
};

export const useHandleLike = ({ postId, isLiked }: Props) => {
  const [isLikeAnimationShown, setIsLikeAnimationShown] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: post } = usePost({ postId });

  const { isSignedIn } = useAuth();
  const postLikeMutation = usePostLike();
  const queryClient = useQueryClient();

  const handleLike = () => {
    if (!isSignedIn) {
      return toast.error('Sign in first.');
    }

    const oldPost = queryClient.getQueryData<Post>(['post', postId]);

    postLikeMutation.mutate(
      { postId, isLiked },
      {
        onError: () => {
          queryClient.setQueryData<Post>(['post', postId], oldPost);
        },
      },
    );

    if (post) {
      updatePostQuery({ queryClient, post });
    }
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
