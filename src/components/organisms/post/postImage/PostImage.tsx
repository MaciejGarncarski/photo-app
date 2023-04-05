import clsx from 'clsx';
import { useState } from 'react';

import { useUser } from '@/src/hooks/useUser';
import { PostData } from '@/src/utils/apis/transformPost';
import { getDescriptionData } from '@/src/utils/getDescriptionData';

import { MotionImage } from '@/src/components/molecules/avatar/Avatar';
import { Loader } from '@/src/components/molecules/loader/Loader';

import styles from './postImage.module.scss';

type PropsTypes = {
  width: number;
  height: number;
  priority: boolean;
  src: string;
  post: PostData;
};

export const PostImage = ({ height, priority, src, width, post }: PropsTypes) => {
  const { description, authorId } = post;

  const { data } = useUser({ userId: authorId });
  const [isLoading, setIsLoading] = useState(true);

  const { shortDescription } = getDescriptionData(description);

  return (
    <>
      {isLoading && (
        <div className={styles.loader}>
          <Loader color="blue" size="normal" />
        </div>
      )}
      <MotionImage
        className={clsx({ [styles.imgLoading]: isLoading }, styles.sliderImage)}
        src={src}
        priority={priority}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        alt={`${data?.username} - ${shortDescription}`}
      />
    </>
  );
};
