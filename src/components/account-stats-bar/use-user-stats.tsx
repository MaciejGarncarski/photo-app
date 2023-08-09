import { useModal } from '@/src/hooks/use-modal';
import { useUser } from '@/src/hooks/use-user';

type PropsTypes = {
  userId: string;
};

type Titles = 'posts' | 'followers' | 'friends';

type ListData = Array<{ title: Titles; count: number; onClick: () => void }>;

export const useUserStats = ({ userId }: PropsTypes) => {
  const { data } = useUser({ userId });
  const followersModal = useModal();
  const friendsModal = useModal();

  const listData: ListData = [
    {
      title: 'posts',
      count: data?.postsCount || 0,
      onClick: () => window.scrollBy({ top: 200, behavior: 'smooth' }),
    },
    {
      title: 'followers',
      count: data?.followersCount || 0,
      onClick: followersModal.openModal,
    },
    {
      title: 'friends',
      count: data?.friendsCount || 0,
      onClick: friendsModal.openModal,
    },
  ];

  return { followersModal, friendsModal, listData };
};
