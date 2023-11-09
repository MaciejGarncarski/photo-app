import { Metadata } from 'next';

import { getPageTitle } from '@/src/utils/get-page-title';

import { ChatRoom } from '@/src/components/pages/chat-room/chat-room';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

export const metadata: Metadata = {
  title: getPageTitle('Chat'),
};

const ChatRoomPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <ChatRoom />
    </ProtectedPage>
  );
};

export default ChatRoomPage;
