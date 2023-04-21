import { useModal } from '@/src/hooks/useModal';
import { unlock } from '@/src/utils/bodyLock';

import { useDeleteAvatar } from '@/src/components/pages/editAccount/useDeleteAvatar';

export const useOptionsStage = () => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { mutate, isLoading } = useDeleteAvatar();

  const removeAvatar = () => {
    mutate(undefined, {
      onSettled: () => {
        closeModal();
        unlock();
      },
    });
  };

  return { openModal, isModalOpen, isLoading, removeAvatar, closeModal };
};
