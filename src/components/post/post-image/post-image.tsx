import clsx from 'clsx';
import { useState } from 'react';

import { useUser } from '@/src/hooks/use-user';
import { getDescriptionData } from '@/src/utils/get-description-data';

import { MotionImage } from '@/src/components/avatar/avatar';
import { usePost } from '@/src/components/pages/account/use-post';

import styles from './post-image.module.scss';

type Props = {
  priority: boolean;
  src: string;
  width: number;
  height: number;
  postId: number;
};

const ASPECT_RATIO_LANDSCAPE = 191;
const ASPECT_RATIO_PORTRAIT = 80;

const getAspectRatio = (width: number, height: number) => {
  const calculatedAspectRatio = Math.round((width / height) * 100);

  if (calculatedAspectRatio === ASPECT_RATIO_LANDSCAPE) {
    return 'landscape';
  }

  if (calculatedAspectRatio === ASPECT_RATIO_PORTRAIT) {
    return 'portrait';
  }

  return 'square';
};

export const PostImage = ({ priority, src, height, width, postId }: Props) => {
  const { data: postData } = usePost({ postId: postId });
  const { data } = useUser({ userId: postData?.authorId || '' });
  const [isLoading, setIsLoading] = useState(true);

  if (!postData) {
    return null;
  }

  const imageAspectRatio = getAspectRatio(width, height);

  const { shortDescription } = getDescriptionData(postData.description);

  return (
    <MotionImage
      className={clsx(styles[imageAspectRatio], styles.sliderImage)}
      src={src}
      priority={priority}
      quality={100}
      animate={{
        opacity: isLoading ? 0 : 1,
      }}
      onLoad={() => setIsLoading(false)}
      width={width}
      height={height}
      alt={`${data?.username} - ${shortDescription}`}
    />
  );
};
