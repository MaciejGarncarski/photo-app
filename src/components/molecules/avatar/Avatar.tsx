import { IconUser } from '@tabler/icons-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { useUser } from '@/src/hooks/useUser';

import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './avatar.module.scss';

type Sizes = 'small' | 'medium' | 'big';

type PropsTypes = {
  userId?: string;
  size: Sizes;
};

const AVATAR_SIZE = 140;

export const MotionImage = motion(Image);

export const Avatar = ({ userId, size }: PropsTypes) => {
  const { customImage, image, username } = useUser({ userId });
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
      {hasDefaultImage && <MotionImage src={image} alt={username ?? ''} width={AVATAR_SIZE} height={AVATAR_SIZE} />}
      {hasCustomImage && (
        <MotionImage
          src={customImage}
          alt={username ?? ''}
          data-testid="customImage"
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
        />
      )}
    </figure>
  );
};
