import clsx from 'clsx';
import { useState } from 'react';

import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { useUser } from '@/src/hooks/use-user';
import { getDescriptionData } from '@/src/utils/get-description-data';

import { MotionImage } from '@/src/components/avatar/avatar';
import { Loader } from '@/src/components/loader/loader';
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
    <>
      {isLoading && (
        <div className={styles.loader}>
          <Loader color="accent" size="big" />
        </div>
      )}
      <MotionImage
        className={clsx({ [styles.imgLoading]: isLoading }, styles.sliderImage)}
        src={src}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        width={size}
        quality={100}
        height={size}
        alt={`${data?.username} - ${shortDescription}`}
      />
    </>
  );
};
