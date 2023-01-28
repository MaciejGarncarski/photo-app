import { IconUser } from '@tabler/icons';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';

import { useAccount } from '@/components/pages/account/useAccount';

import styles from './avatar.module.scss';

type AvatarProps = Partial<Pick<ImageProps, 'width' | 'height'>> & {
  userId?: string;
  className?: string;
};

const DEFAULT_AVATAR_SIZE = 140;

export const MotionImage = motion(Image);

export const Avatar = ({
  userId,
  className,
  width = DEFAULT_AVATAR_SIZE,
  height = DEFAULT_AVATAR_SIZE,
}: AvatarProps) => {
  const { data } = useAccount({ userId });

  if (!data?.user) {
    return null;
  }

  const hasNoImage = (!data.user.customImage && !data.user.image) || !userId;

  return (
    <figure className={clsx(className, styles.avatarContainer)}>
      {hasNoImage && <IconUser className={styles.icon} />}
      {!hasNoImage && (
        <MotionImage
          src={data.user.customImage ?? data.user.image ?? ''}
          alt={`${data.user.username}'s avatar`}
          width={width}
          height={height}
          className={styles.avatar}
        />
      )}
    </figure>
  );
};
