import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useUserByUsername } from '@/src/hooks/useUserByUsername';

type Arguments = {
  username: string;
};

export const useAccount = ({ username }: Arguments) => {
  const router = useRouter();
  const { data: sessionUserData } = useAuth();
  const { data: userData, isError } = useUserByUsername({ username });
  const settingsModal = useModal();
  const signOutModal = useModal();
  const isOwner = sessionUserData?.id === userData?.id;

  useEffect(() => {
    if (isError) {
      router.push('/');
    }
  }, [isError, router]);

  return { isOwner, signOutModal, settingsModal, userData };
};
