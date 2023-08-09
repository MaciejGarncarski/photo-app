'use client';

import { useQueryClient } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

import { socket } from '@/src/utils/socket';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-posts';

export const newPostsAtom = atom(false);

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
