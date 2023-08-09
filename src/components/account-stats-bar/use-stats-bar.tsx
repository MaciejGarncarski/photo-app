import { useModal } from '@/src/hooks/useModal';
import { useUser } from '@/src/hooks/useUser';

type PropsTypes = {
  userId: string;
};

type Titles = 'posts' | 'followers' | 'friends';

type ListData = Array<{ title: Titles; count: number; onClick: () => void }>;

export const useListData = ({ userId }: PropsTypes) => {
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
