import { useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

import { socket } from "@/utils/api/socket";

import { HOME_POSTS_QUERY_KEY } from "@/components/pages/home/use-homepage-posts";

export const newPostsAtom = atom(false);

export const useNewPost = () => {
  const [hasNewPosts, setHasNewPosts] = useAtom(newPostsAtom);
  const queryClient = useQueryClient();

  useEffect(() => {
    const onNewPost = () => {
      setHasNewPosts(true);
    };

    socket.on("new post", onNewPost);

    return () => {
      setHasNewPosts(false);
      socket.off("new post", onNewPost);
    };
  }, [setHasNewPosts]);

  const handleRefetchPosts = async () => {
    await queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERY_KEY });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setHasNewPosts(false);
  };

  return { hasNewPosts, handleRefetchPosts };
};
