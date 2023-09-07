import { useModal } from '@/src/hooks/use-modal';

import { useDeleteChatMessage } from '@/src/components/chat-message/use-delete-message';

type Props = {
  receiverId: string;
  createdAt: Date;
};

export const useChatMessage = ({ receiverId }: Props) => {
  const { mutate } = useDeleteChatMessage({ receiverId });
  const { isModalOpen, openModal, closeModal } = useModal();

  return {
    isModalOpen,
    openModal,
    closeModal,
    mutate,
  };
};
