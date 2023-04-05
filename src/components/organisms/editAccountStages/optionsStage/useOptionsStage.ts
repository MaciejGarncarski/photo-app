import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { unlock } from '@/src/utils/bodyLock';

import { useDeleteAvatar } from '@/src/components/pages/editAccount/useDeleteAvatar';

export const useOptionsStage = () => {
  const { data } = useAuth();

  const { openModal, closeModal, isModalOpen } = useModal();
  const { mutate, isLoading } = useDeleteAvatar();

  const removeAvatar = () => {
    mutate(
      { userId: data?.customImage || '' },
      {
        onSettled: () => {
          closeModal();
          unlock();
        },
      },
    );
  };

  return { openModal, isModalOpen, isLoading, removeAvatar, customImage: data?.customImage, closeModal };
};
