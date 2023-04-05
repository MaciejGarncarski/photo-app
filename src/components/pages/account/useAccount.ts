import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useUserByUsername } from '@/src/hooks/useUserByUsername';
import { lock } from '@/src/utils/bodyLock';

type Arguments = {
  isModalOpen: boolean;
  username: string;
};

export const useAccount = ({ isModalOpen, username }: Arguments) => {
  const router = useRouter();
  const { data: sessionUserData } = useAuth();
  const { data: userData, isError } = useUserByUsername({ username });

  const postModal = useModal(isModalOpen);
  const settingsModal = useModal();
  const signOutModal = useModal();

  const isOwner = sessionUserData?.id === userData?.id;

  useEffect(() => {
    if (isError) {
      router.push('/');
    }
  }, [isError, router]);

  useEffect(() => {
    if (isModalOpen) {
      lock();
    }
  }, [isModalOpen]);

  const postModalClose = () => {
    postModal.closeModal();
    router.push(`/${userData?.username}`);
  };

  return { postModalClose, isOwner, signOutModal, settingsModal, userData, postModal };
};
