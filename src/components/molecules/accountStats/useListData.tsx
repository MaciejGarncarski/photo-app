import { useUser } from '@/hooks/useUser';

import { useModal } from '@/components/molecules/modal/useModal';

type PropsTypes = {
  userId: string;
};

type Titles = 'posts' | 'followers' | 'friends';

type ListData = Array<{ title: Titles; count: number; onClick: () => void }>;

export const useListData = ({ userId }: PropsTypes) => {
  const { followersCount, friendsCount, postsCount } = useUser({ userId });
  const followingModal = useModal();
  const followersModal = useModal();

  const listData: ListData = [
    {
      title: 'posts',
      count: postsCount,
      onClick: () => window.scrollBy({ top: 200, behavior: 'smooth' }),
    },
    {
      title: 'followers',
      count: followersCount,
      onClick: followersModal.open,
    },
    {
      title: 'friends',
      count: friendsCount,
      onClick: followingModal.open,
    },
  ];

  return { followersModal, followingModal, listData };
};
