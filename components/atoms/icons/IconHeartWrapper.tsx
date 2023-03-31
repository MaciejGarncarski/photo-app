import { IconHeart } from '@tabler/icons-react';
import clsx from 'clsx';

type PropsTypes = {
  isActive?: boolean;
};

export const IconHeartWrapper = ({ isActive }: PropsTypes) => {
  const customClassName = clsx('icon icon-tabler icon-tabler-message');

  if (isActive) {
    return <IconHeart className={customClassName} color="#dd2020" fill="#dd2020" />;
  }
  return <IconHeart className={customClassName} />;
};
