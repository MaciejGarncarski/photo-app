'use client';

import { User } from '@phosphor-icons/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { useUser } from '@/src/hooks/use-user';

import styles from './avatar.module.scss';

type Size = 'xs' | 'small' | 'medium' | 'big';

type Props = {
  userId: string;
  size: Size;
};

export const MotionImage = motion(Image);

const avatarSizes: Record<Size, number> = {
  big: 140,
  medium: 90,
  small: 40,
  xs: 30,
};

export const Avatar = ({ userId, size }: Props) => {
  const { data } = useUser({ userId });

  const avatarSize = avatarSizes[size];

  if (!data) {
    return (
      <div className={clsx(styles[size], styles.avatar)}>
        <div className={styles.noImage}>
          <User size={avatarSizes[size]} />
          <span className="visually-hidden">Loading avatar</span>
        </div>
      </div>
    );
  }

  const { image, customImage, username } = data;

  const hasNoImage = Boolean(!image && !customImage);
  const hasDefaultImage = image && !Boolean(customImage);
  const hasCustomImage = customImage;

  return (
    <div className={clsx(styles[size], styles.avatar)}>
      {hasNoImage && (
        <div className={styles.noImage}>
          <User size={avatarSizes[size]} />
          <span className="visually-hidden">@{username}</span>
        </div>
      )}
      {(hasDefaultImage || hasCustomImage) && (
        <MotionImage
          src={customImage ?? image ?? ''}
          alt={`@${username} avatar`}
          width={avatarSize}
          height={avatarSize}
        />
      )}
    </div>
  );
};
