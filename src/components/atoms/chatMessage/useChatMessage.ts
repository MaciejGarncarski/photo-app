import { useAuth } from '@/src/hooks/useAuth';
import { formatDate } from '@/src/utils/formatDate';

import { useDeleteChatMessage } from '@/src/components/atoms/chatMessage/useDeleteChatMessage';
import { useModal } from '@/src/components/molecules/modal/useModal';

type PropsTypes = {
  sender: string;
  receiver: string;
  createdAt: Date;
};

export const useChatMessage = ({ sender, receiver, createdAt }: PropsTypes) => {
  const { mutate } = useDeleteChatMessage({ receiver, sender });
  const { modalOpen, open, close } = useModal();
  const { session } = useAuth();
  const isReceiver = receiver === session?.user?.id;
  const formattedDate = formatDate(createdAt);

  return { modalOpen, open, close, isReceiver, formattedDate, mutate };
};
