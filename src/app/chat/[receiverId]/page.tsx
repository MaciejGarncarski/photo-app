import { Metadata } from 'next';

import { getTitle } from '@/src/utils/get-title';

import { ChatRoom } from '@/src/components/pages/chat-room/chat-room';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

export const metadata: Metadata = {
  title: getTitle('Chat'),
};

const ChatRoomPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <ChatRoom />
    </ProtectedPage>
  );
};

export default ChatRoomPage;
