import { useModal } from '@/src/hooks/use-modal';

import { useDeleteAvatar } from '@/src/components/pages/edit-account/use-delete-avatar';

export const useOptionsStage = () => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { mutate, isLoading } = useDeleteAvatar();

  const removeAvatar = () => {
    mutate(undefined, {
      onSettled: () => {
        closeModal();
      },
    });
  };

  return { openModal, isModalOpen, isLoading, removeAvatar, closeModal };
};
