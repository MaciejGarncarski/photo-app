import { useAuth } from '@/hooks/useAuth';

import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { Loader } from '@/components/molecules/loader/Loader';
import { Chat } from '@/components/pages/chat/Chat';

const ChatPage = () => {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loader color="blue" size="normal" />;
  }

  if (!isSignedIn) {
    return <AccessDenied />;
  }

  return <Chat />;
};

export default ChatPage;
