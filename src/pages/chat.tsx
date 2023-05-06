import { Chat } from '@/src/components/pages/chat/Chat';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

const ChatPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <Chat />
    </ProtectedPage>
  );
};

export default ChatPage;
