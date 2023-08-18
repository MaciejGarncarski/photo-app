'use client';

import { useRef, useState } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { usePostLike } from '@/src/components/post/post-buttons/use-post-like';

const TIMEOUT = 1000;

type Props = {
  postId: number;
  isLiked: boolean;
};

export const useHandleLike = ({ postId, isLiked }: Props) => {
  const [isLikeAnimationShown, setIsLikeAnimationShown] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isSignedIn } = useAuth();
  const postLikeMutation = usePostLike();

  const handleLike = () => {
    postLikeMutation.mutate({ postId, isLiked });
  };

  const handleLikeWithAnimation = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (isLiked) {
      return;
    }

    handleLike();

    if (isSignedIn) {
      setIsLikeAnimationShown(true);
      timeoutId.current = setTimeout(() => {
        setIsLikeAnimationShown(false);
      }, TIMEOUT);
    }
  };

  return { handleLike, handleLikeWithAnimation, isLikeAnimationShown };
};
