import { IconUser } from '@tabler/icons';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';

import { useUser } from '@/components/pages/account/useUser';

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
  const { customImage, image, username } = useUser({ userId });

  const hasNoImage = Boolean(!image && !customImage);
  const hasDefaultImage = image && !Boolean(customImage);
  const hasCustomImage = customImage;

  return (
    <figure className={clsx(className, styles.avatarContainer)}>
      {hasNoImage && <IconUser data-testid="empty avatar" className={styles.icon} />}
      {hasDefaultImage && (
        <MotionImage
          data-testid="default avatar"
          src={image}
          alt={`${username}'s avatar`}
          width={width}
          height={height}
          className={styles.avatar}
        />
      )}
      {hasCustomImage && (
        <MotionImage
          src={customImage}
          data-testid="avatar"
          alt={`${username}'s avatar`}
          width={width}
          height={height}
          className={styles.avatar}
        />
      )}
    </figure>
  );
};
