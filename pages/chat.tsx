import { useAuth } from '@/hooks/useAuth';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { Chat } from '@/components/pages/chat/Chat';

const ChatPage = () => {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loader variant="margin-top" />;
  }

  if (!isSignedIn) {
    return <AccessDenied />;
  }

  return <Chat />;
};

export default ChatPage;
