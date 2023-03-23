import clsx from 'clsx';
import { useState } from 'react';

import { useUser } from '@/hooks/useUser';
import { PostData } from '@/utils/apis/transformPost';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { Loader } from '@/components/atoms/loader/Loader';
import { descriptionData } from '@/components/organisms/homePost/description';

import styles from './postImage.module.scss';

type PropsTypes = {
  image: {
    width: number;
    height: number;
    priority: boolean;
    src: string;
  };
  className?: string;
  post: PostData;
};

export const PostImage = ({ image, post, className }: PropsTypes) => {
  const { description, authorId } = post;
  const { priority, width, height, src } = image;

  const { username } = useUser({ userId: authorId });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { shortDescription } = descriptionData(description);

  return (
    <>
      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      <MotionImage
        className={clsx(isLoading && styles.imgLoading, className, styles.sliderImage)}
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
