import { useModal } from '@/src/hooks/use-modal';

import { useDeleteAvatar } from '@/src/components/pages/edit-account/use-delete-avatar';

export const useOptionsStage = () => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { mutate, isPending } = useDeleteAvatar();

  const removeAvatar = () => {
    mutate(
      {},
      {
        onSettled: () => {
          closeModal();
        },
      },
    );
  };

  return { openModal, isModalOpen, isPending, removeAvatar, closeModal };
};
