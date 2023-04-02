import { IconMessage2, IconShare } from '@tabler/icons-react';
import { ReactElement } from 'react';

import { PostData } from '@/src/utils/apis/transformPost';

import { IconHeartWrapper } from '@/src/components/atoms/icons/IconHeartWrapper';
import { useModal } from '@/src/components/molecules/modal/useModal';
import { useHandleLike } from '@/src/components/molecules/post/postButtons/useHandleLike';

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
