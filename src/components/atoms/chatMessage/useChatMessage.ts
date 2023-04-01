import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/formatDate';

import { useDeleteChatMessage } from '@/components/atoms/chatMessage/useDeleteChatMessage';
import { useModal } from '@/components/molecules/modal/useModal';

type PropsTypes = {
  sender: string;
  receiver: string;
  created_at: Date;
};

export const useChatMessage = ({ sender, receiver, created_at }: PropsTypes) => {
  const { mutate } = useDeleteChatMessage({ receiver, sender });
  const { modalOpen, open, close } = useModal();
  const { session } = useAuth();
  const isReceiver = receiver === session?.user?.id;
  const formattedDate = formatDate(created_at);

  return { modalOpen, open, close, isReceiver, formattedDate, mutate };
};
