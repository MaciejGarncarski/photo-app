import { Chat } from '@/src/components/pages/chat/chat';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

const ChatPage = () => {
  return (
    <ProtectedPage signedIn={true}>
      <Chat />
    </ProtectedPage>
  );
};

export default ChatPage;
