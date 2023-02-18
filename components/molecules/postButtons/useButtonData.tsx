import { IconMessage, IconShare } from '@tabler/icons';
import { ReactElement } from 'react';

import { IconHeartWrapper } from '@/components/atoms/icons/IconHeartWrapper';

type ButtonData = Array<{ alt: string; icon: ReactElement; onClick: () => void }>;

type PropsTypes = {
  isLiked: boolean;
  openModal: () => void;
  openShare: () => void;
  handleLike: () => void;
};

export const useButtonData = ({ isLiked, handleLike, openModal, openShare }: PropsTypes) => {
  const likeIcon = <IconHeartWrapper isActive={isLiked} />;

  const buttonData: ButtonData = [
    { alt: 'like', icon: likeIcon, onClick: handleLike },
    { alt: 'comment', icon: <IconMessage />, onClick: openModal },
    { alt: 'share', icon: <IconShare />, onClick: openShare },
  ];

  return { buttonData };
};
