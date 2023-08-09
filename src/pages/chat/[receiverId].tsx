import { ChatRoom } from '@/src/components/pages/chat-room/chat-room';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

const ChatRoomPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <ChatRoom />
    </ProtectedPage>
  );
};

export default ChatRoomPage;
