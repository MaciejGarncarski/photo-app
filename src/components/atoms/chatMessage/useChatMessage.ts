import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { formatDate } from '@/src/utils/formatDate';

import { useDeleteChatMessage } from '@/src/components/atoms/chatMessage/useDeleteChatMessage';

type PropsTypes = {
  receiverId: string;
  createdAt: Date;
};

export const useChatMessage = ({ receiverId, createdAt }: PropsTypes) => {
  const { mutate } = useDeleteChatMessage({ receiverId });
  const { isModalOpen, openModal, closeModal } = useModal();
  const { sessionUser } = useAuth();
  const isReceiver = receiverId === sessionUser?.id;
  const formattedDate = formatDate(createdAt);

  return {
    isModalOpen,
    openModal,
    closeModal,
    isReceiver,
    formattedDate,
    mutate,
  };
};
