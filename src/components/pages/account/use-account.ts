import { useAuth } from '@/src/hooks/use-auth';
import { useModal } from '@/src/hooks/use-modal';
import { useUserByUsername } from '@/src/hooks/use-user-by-username';

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
