import { AnimatedPage } from '@/src/components/pages/animatedPage/AnimatedPage';
import { ChatRoom } from '@/src/components/pages/chatRoom/ChatRoom';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

const ChatRoomPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <AnimatedPage>
        <ChatRoom />
      </AnimatedPage>
    </ProtectedPage>
  );
};

export default ChatRoomPage;
