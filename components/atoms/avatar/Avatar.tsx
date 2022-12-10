import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import { AiOutlineUser } from 'react-icons/ai';

import styles from './avatar.module.scss';

import { useAccount } from '@/components/pages/account/useAccount';

type AvatarProps = Partial<Pick<ImageProps, 'width' | 'height'>> & {
  userID: string;
  alt: string;
  className?: string;
};

const DEFAULT_AVATAR_SIZE = 140;

export const Avatar = ({
  userID,
  alt,
  className,
  width = DEFAULT_AVATAR_SIZE,
  height = DEFAULT_AVATAR_SIZE,
}: AvatarProps) => {
  const { data } = useAccount({ id: userID });

  if (!data?.user) {
    return null;
  }

  if (!data.user.customImage && !data.user.image) {
    return <AiOutlineUser className={clsx(className, styles.avatar)} />;
  }

  return (
    <Image
      src={data.user.customImage ?? data.user.image ?? ''}
      alt={alt}
      width={width}
      height={height}
      className={clsx(className, styles.avatar)}
    />
  );
};
