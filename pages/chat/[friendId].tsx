import { useRouter } from 'next/router';

import { string } from '@/utils/string';

import { Chat } from '@/components/pages/chat/Chat';

const FriendChatPage = () => {
  const router = useRouter();

  return <Chat friendId={string(router.query.friendId)} />;
};

export default FriendChatPage;
