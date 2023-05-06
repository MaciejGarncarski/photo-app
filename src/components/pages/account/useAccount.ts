import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useUserByUsername } from '@/src/hooks/useUserByUsername';

type Arguments = {
  username: string;
};

export const useAccount = ({ username }: Arguments) => {
  const { sessionUser } = useAuth();
  const { data: userData, isError } = useUserByUsername({ username });
  const settingsModal = useModal();
  const signOutModal = useModal();
  const isOwner = sessionUser?.id === userData?.id;

  return { isOwner, signOutModal, settingsModal, userData, isError };
};
