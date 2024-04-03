'use client';

import { User } from '@phosphor-icons/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { useUser } from '@/src/hooks/use-user';

import styles from './avatar.module.scss';

type Size = 'small' | 'medium' | 'big';

type Props = {
  userId: string;
  size: Size;
};

export const MotionImage = motion(Image);

const avatarSizes: Record<Size, number> = {
  big: 140,
  medium: 90,
  small: 30,
};

export const Avatar = ({ userId, size }: Props) => {
  const { data, isPending } = useUser({ userId });
  const avatarSize = avatarSizes[size];

  const avatarClassName = clsx(styles[size], styles.avatar);

  if (!data || isPending) {
    return (
      <span className={avatarClassName}>
        <span className={styles.noImage}>
          <User className={styles.imagePlaceholder} />
          <span className="visually-hidden">Loading avatar</span>
        </span>
      </span>
    );
  }

  const { avatar, username } = data;

  return (
    <span className={avatarClassName}>
      {avatar ? (
        <MotionImage
          src={avatar}
          alt={`@${username} avatar`}
          width={avatarSize}
          height={avatarSize}
        />
      ) : (
        <span className={styles.noImage}>
          <User className={styles.imagePlaceholder} />
          <span className="visually-hidden">{`@${username}`} avatar</span>
        </span>
      )}
    </span>
  );
};
