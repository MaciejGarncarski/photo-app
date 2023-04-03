import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { formatDate } from '@/src/utils/formatDate';

import { useDeleteChatMessage } from '@/src/components/atoms/chatMessage/useDeleteChatMessage';

type PropsTypes = {
  sender: string;
  receiver: string;
  createdAt: Date;
};

export const useChatMessage = ({ sender, receiver, createdAt }: PropsTypes) => {
  const { mutate } = useDeleteChatMessage({ receiver, sender });
  const { isModalOpen, openModal, closeModal } = useModal();
  const { session } = useAuth();
  const isReceiver = receiver === session?.user?.id;
  const formattedDate = formatDate(createdAt);

  return { isModalOpen, openModal, closeModal, isReceiver, formattedDate, mutate };
};
