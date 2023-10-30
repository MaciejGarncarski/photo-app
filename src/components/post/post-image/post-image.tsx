import { useState } from 'react';

import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { useUser } from '@/src/hooks/use-user';
import { getDescriptionData } from '@/src/utils/get-description-data';

import { MotionImage } from '@/src/components/avatar/avatar';
import { usePost } from '@/src/components/pages/account/use-post';

import styles from './post-image.module.scss';

type Props = {
  priority: boolean;
  src: string;
  postId: number;
};

export const PostImage = ({ priority, src, postId }: Props) => {
  const { isMobile } = useIsMobile();
  const { data: postData } = usePost({ postId: postId });
  const { data } = useUser({ userId: postData?.authorId || '' });
  const [isLoading, setIsLoading] = useState(true);

  if (!postData) {
    return null;
  }

  const { shortDescription } = getDescriptionData(postData.description);

  const size = isMobile ? 320 : 600;

  return (
    <MotionImage
      className={styles.sliderImage}
      src={src}
      priority={priority}
      quality={100}
      animate={{
        opacity: isLoading ? 0 : 1,
      }}
      onLoad={() => setIsLoading(false)}
      width={size}
      height={size}
      alt={`${data?.username} - ${shortDescription}`}
    />
  );
};
