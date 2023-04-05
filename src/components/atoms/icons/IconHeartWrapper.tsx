import { IconHeart } from '@tabler/icons-react';

type PropsTypes = {
  isActive?: boolean;
};

export const IconHeartWrapper = ({ isActive }: PropsTypes) => {
  if (isActive) {
    return <IconHeart color="#dd2020" fill="#dd2020" />;
  }
  return <IconHeart />;
};
