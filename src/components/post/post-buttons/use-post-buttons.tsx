import { IconMessage2, IconShare } from '@tabler/icons-react';
import { ReactElement } from 'react';

import { useModal } from '@/src/hooks/useModal';
import { formatCount } from '@/src/utils/formatCount';

import { IconHeartWrapper } from '@/src/components/atoms/icons/IconHeartWrapper';

import { useHandleLike } from '@/src/components/organisms/post/postButtons/useHandleLike';

import { Post } from '@/src/schemas/post.schema';

type ButtonData = Array<{
  alt: string;
  icon: ReactElement;
  onClick: () => void;
  count?: string;
}>;

type Arguments = {
  post: Post;
  parentModalOpen?: boolean;
};

export const usePostButtonsData = ({ post, parentModalOpen }: Arguments) => {
  const postModal = useModal();
  const shareModal = useModal();
  const { handleLike } = useHandleLike({ post });

  const postModalOpen = () => {
    postModal.openModal();
  };
  const { isLiked, likesCount, commentsCount } = post;

  const buttonData: ButtonData = [
    {
      alt: 'like',
      icon: <IconHeartWrapper isActive={Boolean(isLiked)} />,
      onClick: handleLike,
      count: formatCount(likesCount),
    },
    {
      alt: 'comment',
      icon: <IconMessage2 />,
      onClick: parentModalOpen ? () => null : postModalOpen,
      count: formatCount(commentsCount),
    },
    { alt: 'share', icon: <IconShare />, onClick: shareModal.openModal },
  ];

  return { shareModal, postModal, buttonData };
};
