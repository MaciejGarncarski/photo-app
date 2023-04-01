import clsx from 'clsx';
import { useState } from 'react';

import { useUser } from '@/hooks/useUser';
import { PostData } from '@/utils/apis/transformPost';
import { getDescriptionData } from '@/utils/getDescriptionData';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { Loader } from '@/components/molecules/loader/Loader';

import styles from './postImage.module.scss';

type PropsTypes = {
  image: {
    width: number;
    height: number;
    priority: boolean;
    src: string;
  };
  post: PostData;
};

export const PostImage = ({ image, post }: PropsTypes) => {
  const { description, authorId } = post;
  const { priority, width, height, src } = image;

  const { username } = useUser({ userId: authorId });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { shortDescription } = getDescriptionData(description);

  return (
    <>
      {isLoading && (
        <div className={styles.loader}>
          <Loader color="blue" size="normal" />;
        </div>
      )}
      <MotionImage
        className={clsx({ [styles.imgLoading]: isLoading }, styles.sliderImage)}
        src={src}
        priority={priority}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        alt={`${username} - ${shortDescription}`}
      />
    </>
  );
};
