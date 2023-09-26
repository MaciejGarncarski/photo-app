import { Chat } from '@/src/components/pages/chat/chat';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

const ChatPage = () => {
  return (
    <ProtectedPage sessionNeeded={true}>
      <Chat />
    </ProtectedPage>
  );
};

export default ChatPage;
