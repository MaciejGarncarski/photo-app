import { AnimatedPage } from '@/src/components/pages/animatedPage/AnimatedPage';
import { ChatRoom } from '@/src/components/pages/chatRoom/ChatRoom';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

const ChatRoomPage = () => {
  return (
    <AnimatedPage>
      <ProtectedPage shouldBeSignedIn>
        <ChatRoom />
      </ProtectedPage>
    </AnimatedPage>
  );
};

export default ChatRoomPage;
