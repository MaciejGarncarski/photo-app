import { useModal } from '@/src/hooks/use-modal';
import { useUser } from '@/src/hooks/use-user';

type Props = {
  userId: string;
};

type ListData = Array<{ title: string; count: number; onClick: () => void }>;

export const useUserStats = ({ userId }: Props) => {
  const { data } = useUser({ userId });
  const followersModal = useModal();
  const friendsModal = useModal();

  const listData: ListData = [
    {
      title: (data?.postsCount || 0) > 1 ? 'Posts' : 'Post',
      count: data?.postsCount || 0,
      onClick: () => window.scrollBy({ top: 200, behavior: 'smooth' }),
    },
    {
      title: (data?.followersCount || 0) > 1 ? 'Followers' : 'Follower',
      count: data?.followersCount || 0,
      onClick: followersModal.openModal,
    },
    {
      title: 'following',
      count: data?.friendsCount || 0,
      onClick: friendsModal.openModal,
    },
  ];

  return { followersModal, friendsModal, listData };
};
