import { IconUser } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';

import { useUser } from '@/hooks/useUser';

import { VisuallyHidden } from '@/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './avatar.module.scss';

type PropsTypes = {
  userId?: string;
  width?: number;
  height?: number;
};

const DEFAULT_AVATAR_SIZE = 140;

export const MotionImage = motion(Image);

export const Avatar = ({ userId, width = DEFAULT_AVATAR_SIZE, height = DEFAULT_AVATAR_SIZE }: PropsTypes) => {
  const { customImage, image, username } = useUser({ userId });
  const hasNoImage = Boolean(!image && !customImage);
  const hasDefaultImage = image && !Boolean(customImage);
  const hasCustomImage = customImage;

  return (
    <figure className={styles.avatar}>
      {hasNoImage && (
        <div data-testid="empty icon" className={styles.noImage}>
          <IconUser />
          <VisuallyHidden>{username || ''}</VisuallyHidden>
        </div>
      )}
      {hasDefaultImage && <MotionImage src={image} alt={username ?? ''} width={width} height={height} />}
      {hasCustomImage && (
        <MotionImage src={customImage} alt={username ?? ''} data-testid="customImage" width={width} height={height} />
      )}
    </figure>
  );
};
