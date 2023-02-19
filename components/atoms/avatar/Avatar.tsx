import { IconUser } from '@tabler/icons';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';

import { useUser } from '@/hooks/useUser';

import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './avatar.module.scss';

type PropsTypes = Partial<Pick<ImageProps, 'width' | 'height'>> & {
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
}: PropsTypes) => {
  const { customImage, image, username } = useUser({ userId });

  const hasNoImage = Boolean(!image && !customImage);
  const hasDefaultImage = image && !Boolean(customImage);
  const hasCustomImage = customImage;

  return (
    <figure className={clsx(className, styles.avatarContainer)}>
      {hasNoImage && (
        <div data-testid="empty icon">
          <IconUser className={styles.icon} />
          <VisuallyHiddenText text={username ?? ''} />
        </div>
      )}
      {hasDefaultImage && (
        <MotionImage src={image} alt={username ?? ''} width={width} height={height} className={styles.avatar} />
      )}
      {hasCustomImage && (
        <MotionImage
          src={customImage}
          alt={username ?? ''}
          data-testid="customImage"
          width={width}
          height={height}
          className={styles.avatar}
        />
      )}
    </figure>
  );
};
