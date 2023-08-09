import { useAuth } from '@/src/hooks/use-auth';
import { useModal } from '@/src/hooks/use-modal';
import { formatDate } from '@/src/utils/format-date';

import { useDeleteChatMessage } from '@/src/components/chat-message/use-delete-message';

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
