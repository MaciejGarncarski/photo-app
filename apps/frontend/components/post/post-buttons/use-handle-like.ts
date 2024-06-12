"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";

import { usePostLike } from "@/components/post/post-buttons/use-post-like";

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
    if (!isSignedIn) {
      toast.error("You must be logged in to like the post.", {
        id: "LIKE_NOT_SIGNED_IN",
      });
      return;
    }

    postLikeMutation.mutate({ postId, isLiked });
  };

  const handleLikeWithAnimation = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (isLiked) {
      return;
    }

    if (isSignedIn) {
      setIsLikeAnimationShown(true);
      timeoutId.current = setTimeout(() => {
        setIsLikeAnimationShown(false);
      }, TIMEOUT);
    }

    handleLike();
  };

  return { handleLike, handleLikeWithAnimation, isLikeAnimationShown };
};
