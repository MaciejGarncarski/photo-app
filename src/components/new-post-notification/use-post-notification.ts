import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { socket } from '@/src/utils/socket';

import { newPostsAtom } from '@/src/components/pages/home/Home';
import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/useInfinitePosts';

export const useNewPost = () => {
  const [hasNewPosts, setHasNewPosts] = useAtom(newPostsAtom);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('new post', () => {
      setHasNewPosts(true);
    });

    return () => {
      setHasNewPosts(false);
      socket.off('new post');
    };
  }, [setHasNewPosts]);

  const handleRefetchPosts = async () => {
    await queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasNewPosts(false);
  };

  return { hasNewPosts, handleRefetchPosts };
};
