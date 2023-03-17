import { IconMessage2, IconShare } from '@tabler/icons-react';
import { ReactElement } from 'react';

import { lock } from '@/utils/bodyLock';
import { PostData } from '@/utils/transformPost';

import { IconHeartWrapper } from '@/components/atoms/icons/IconHeartWrapper';
import { useModal } from '@/components/molecules/modal/useModal';
import { useHandleLike } from '@/components/molecules/post/postButtons/useHandleLike';

type ButtonData = Array<{
  alt: string;
  icon: ReactElement;
  onClick: () => void;
  count?: number;
}>;

type Arguments = {
  post: PostData;
  parentModalOpen?: boolean;
};

export const usePostButtonsData = ({ post, parentModalOpen }: Arguments) => {
  const postModal = useModal();
  const shareModal = useModal();
  const { handleLike } = useHandleLike({ post });

  const postModalOpen = () => {
    postModal.open();
    lock();
  };
  const { isLiked, likesCount, commentsCount } = post;

  const buttonData: ButtonData = [
    { alt: 'like', icon: <IconHeartWrapper isActive={Boolean(isLiked)} />, onClick: handleLike, count: likesCount },
    {
      alt: 'comment',
      icon: <IconMessage2 />,
      onClick: parentModalOpen ? () => null : postModalOpen,
      count: commentsCount,
    },
    { alt: 'share', icon: <IconShare />, onClick: shareModal.open },
  ];

  return { shareModal, postModal, buttonData };
};
