import { AnimatedPage } from '@/src/components/pages/animatedPage/AnimatedPage';
import { Chat } from '@/src/components/pages/chat/Chat';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

const ChatPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <AnimatedPage>
        <Chat />
      </AnimatedPage>
    </ProtectedPage>
  );
};

export default ChatPage;
