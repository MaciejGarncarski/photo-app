import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

import styles from './avatar.module.scss';

type AvatarProps = Partial<Pick<ImageProps, 'width' | 'height'>> & {
  src: string | null;
  alt: string;
  className?: string;
};

const DEFAULT_AVATAR_SIZE = 140;

export const Avatar = ({
  src,
  alt,
  className,
  width = DEFAULT_AVATAR_SIZE,
  height = DEFAULT_AVATAR_SIZE,
}: AvatarProps) => {
  if (!src) {
    return <p>invalid image</p>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={clsx(className, styles.avatar)}
    />
  );
};
