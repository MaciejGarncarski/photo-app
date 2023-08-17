import { IconHeart, IconMessage2 } from '@tabler/icons-react';
import { ReactElement } from 'react';

import { useModal } from '@/src/hooks/use-modal';
import { formatCount } from '@/src/utils/format-likes';

import { usePost } from '@/src/components/pages/account/use-post';
import { useHandleLike } from '@/src/components/post/post-buttons/use-handle-like';

type ButtonData = Array<{
  alt: string;
  icon: ReactElement;
  onClick: () => void;
  count?: string;
}>;

type Arguments = {
  postId: number;
  parentModalOpen?: boolean;
};

export const usePostButtonsData = ({ postId, parentModalOpen }: Arguments) => {
  const postModal = useModal();
  const { data: post } = usePost({ postId });
  const { handleLike } = useHandleLike({
    postId,
    isLiked: post?.isLiked || false,
  });

  const postModalOpen = () => {
    postModal.openModal();
  };

  const buttonData: ButtonData = [
    {
      alt: 'like',
      icon: <IconHeart color={post?.isLiked ? 'red' : undefined} />,
      onClick: handleLike,
      count: formatCount(post?.likesCount || 0),
    },
    {
      alt: 'comment',
      icon: <IconMessage2 />,
      onClick: parentModalOpen ? () => null : postModalOpen,
      count: formatCount(post?.commentsCount || 0),
    },
  ];

  return { postModal, buttonData };
};
