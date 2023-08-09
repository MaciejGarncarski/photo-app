import { useModal } from '@/src/hooks/useModal';

import { useDeleteAvatar } from '@/src/components/pages/edit-account/useDeleteAvatar';

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
