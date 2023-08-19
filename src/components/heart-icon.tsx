import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

type Props = {
  isLiked: boolean;
};

export const HeartIcon = ({ isLiked }: Props) => {
  if (isLiked) {
    return <IconHeartFilled />;
  }

  return <IconHeart />;
};
