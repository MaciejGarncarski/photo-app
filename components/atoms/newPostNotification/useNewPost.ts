import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

import { clientEnv } from '@/utils/env.mjs';

import { newPostsAtom } from '@/components/pages/home/Home';
import { HOME_POSTS_QUERY_KEY } from '@/components/pages/home/useInfinitePosts';

const socket = io(clientEnv.NEXT_PUBLIC_WS_URL, { transports: ['websocket'] });

export const useNewPost = () => {
  const [hasNewPosts, setHasNewPosts] = useAtom(newPostsAtom);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('new post', () => {
      setHasNewPosts(true);
    });
  }, [setHasNewPosts]);

  const handleRefetchPosts = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
    setHasNewPosts(false);
  };

  return { hasNewPosts, handleRefetchPosts };
};
