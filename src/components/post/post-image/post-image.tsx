import clsx from 'clsx';
import { useState } from 'react';

import { useUser } from '@/src/hooks/use-user';
import { getDescriptionData } from '@/src/utils/get-description-data';

import { MotionImage } from '@/src/components/avatar/avatar';
import { Loader } from '@/src/components/loader/loader';
import { Post } from '@/src/schemas/post.schema';

import styles from './post-image.module.scss';

type Props = {
  width: number;
  height: number;
  priority: boolean;
  src: string;
  post: Post;
};

export const PostImage = ({ height, priority, src, width, post }: Props) => {
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
