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
  const { data, isPending } = useUser({ userId });
  const avatarSize = avatarSizes[size];

  if (!data || isPending) {
    return (
      <div className={clsx(styles[size], styles.avatar)}>
        <div className={styles.noImage}>
          <User className={styles.imagePlaceholderAnimation} />
          <span className="visually-hidden">Loading avatar</span>
        </div>
      </div>
    );
  }

  const { avatar, username } = data;

  const hasImage = Boolean(avatar);

  return (
    <div className={clsx(styles[size], styles.avatar)}>
      {hasImage ? (
        <MotionImage
          src={avatar}
          alt={`@${username} avatar`}
          width={avatarSize}
          height={avatarSize}
        />
      ) : (
        <div className={styles.noImage}>
          <User className={styles.imagePlaceholder} />
          <span className="visually-hidden">{`@${username}`} avatar</span>
        </div>
      )}
    </div>
  );
};
