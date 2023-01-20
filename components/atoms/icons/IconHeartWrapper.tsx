import { IconHeart } from '@tabler/icons';
import clsx from 'clsx';

type PropsTypes = {
  isActive?: boolean;
  className?: string;
};

export const IconHeartWrapper = ({ isActive, className }: PropsTypes) => {
  const customClassName = clsx(className, 'icon icon-tabler icon-tabler-message');

  if (isActive) {
    return <IconHeart className={customClassName} color="#dd2020" fill="#dd2020" />;
  }
  return <IconHeart className={customClassName} />;
};
