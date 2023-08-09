import { ChatRoom } from '@/src/components/pages/chatRoom/ChatRoom';
import { ProtectedPage } from '@/src/components/pages/protected-page/ProtectedPage';

const ChatRoomPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <ChatRoom />
    </ProtectedPage>
  );
};

export default ChatRoomPage;
