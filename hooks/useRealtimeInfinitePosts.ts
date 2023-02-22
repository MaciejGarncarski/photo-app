import { useAtom } from 'jotai';
import useWebSocket from 'react-use-websocket';

import { newPostsAtom } from '@/components/pages/home/Home';

export const useRealtimeInfinitePosts = () => {
  const [, setHasNewPosts] = useAtom(newPostsAtom);

  const { sendMessage, sendJsonMessage } = useWebSocket('ws://127.0.0.1:8080/homepagePosts', {
    onMessage: (message) => {
      const messageData = JSON.parse(message.data);
      if (messageData.status === 'ok') {
        setHasNewPosts(true);
      }
    },
  });

  return { sendJsonMessage, sendMessage };
};
