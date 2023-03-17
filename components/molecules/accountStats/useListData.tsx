import { useModal } from '@/components/molecules/modal/useModal';

type Titles = 'posts' | 'followers' | 'following';

type ListData = Array<{ title: Titles; onClick: () => void }>;

export const useListData = () => {
  const followingModal = useModal();
  const followersModal = useModal();

  const listData: ListData = [
    {
      title: 'posts',
      onClick: () => window.scrollBy({ top: 200, behavior: 'smooth' }),
    },
    {
      title: 'followers',
      onClick: followersModal.open,
    },
    {
      title: 'following',
      onClick: followingModal.open,
    },
  ];

  return { followersModal, followingModal, listData };
};
