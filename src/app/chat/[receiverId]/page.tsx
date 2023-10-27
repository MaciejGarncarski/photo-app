import { Metadata } from 'next';

import { setTitle } from '@/src/utils/set-title';

import { ChatRoom } from '@/src/components/pages/chat-room/chat-room';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

export const metadata: Metadata = {
  title: setTitle('Chat'),
};

const ChatRoomPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <ChatRoom />
    </ProtectedPage>
  );
};

export default ChatRoomPage;
