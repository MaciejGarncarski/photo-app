import { IconStar } from '@tabler/icons-react';

type PropsTypes = {
  isActive?: boolean;
};

export const IconStarWrapper = ({ isActive }: PropsTypes) => {
  if (isActive) {
    return <IconStar fill="#ffef00" />;
  }
  return <IconStar />;
};
