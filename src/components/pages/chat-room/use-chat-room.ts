import { useUser } from '@/src/hooks/use-user';

import { useChatMessages } from '@/src/components/pages/chat-room/use-chat-messages';
import { useChatSubscription } from '@/src/components/pages/chat-room/use-chat-subscription';
import { useMessageForm } from '@/src/components/pages/chat-room/use-message-form';

export const useChatRoom = () => {
  const {
    data,
    isPending,
    ref,
    hasNextPage,
    friendId,
    isError: messagesError,
  } = useChatMessages();

  const { data: friendData, isPending: isUserLoading } = useUser({
    userId: friendId || '',
  });

  const { form, onSubmit } = useMessageForm({ friendId });

  useChatSubscription();

  return {
    isPending,
    isUserLoading,
    data,
    friendId,
    isError: messagesError,
    friendData,
    hasNextPage,
    onSubmit,
    form,
    ref,
  };
};
