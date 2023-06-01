import { IconUser } from '@tabler/icons-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { useUser } from '@/src/hooks/useUser';

import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './Avatar.module.scss';

type Size = 'small' | 'medium' | 'big';

type PropsTypes = {
  userId: string;
  size: Size;
};

export const MotionImage = motion(Image);

const avatarSizes: Record<Size, number> = {
  big: 170,
  medium: 90,
  small: 38,
};

export const Avatar = ({ userId, size }: PropsTypes) => {
  const { data } = useUser({ userId });

  const avatarSize = avatarSizes[size];

  if (!data) {
    return (
      <figure className={clsx(styles[size], styles.avatar)}>
        <div className={styles.noImage}>
          <IconUser />
          <VisuallyHidden>Loading avatar</VisuallyHidden>
        </div>
      </figure>
    );
  }

  const { image, customImage, username } = data;

  const hasNoImage = Boolean(!image && !customImage);
  const hasDefaultImage = image && !Boolean(customImage);
  const hasCustomImage = customImage;

  return (
    <figure className={clsx(styles[size], styles.avatar)}>
      {hasNoImage && (
        <div className={styles.noImage}>
          <IconUser />
          <VisuallyHidden>{username || ''}</VisuallyHidden>
        </div>
      )}
      {hasDefaultImage && (
        <MotionImage
          src={image}
          alt={username ?? ''}
          width={avatarSize}
          height={avatarSize}
        />
      )}
      {hasCustomImage && (
        <MotionImage
          src={customImage}
          alt={username ?? ''}
          data-testid="customImage"
          width={avatarSize}
          height={avatarSize}
        />
      )}
    </figure>
  );
};
