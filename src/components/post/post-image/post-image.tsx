import clsx from 'clsx';
import { useState } from 'react';

import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { useUser } from '@/src/hooks/use-user';
import { getDescriptionData } from '@/src/utils/get-description-data';

import { MotionImage } from '@/src/components/avatar/avatar';
import { Loader } from '@/src/components/loader/loader';
import { usePost } from '@/src/components/pages/account/use-post';
import { Post } from '@/src/schemas/post.schema';

import styles from './post-image.module.scss';

type Props = {
  priority: boolean;
  src: string;
  post: Post;
};

export const PostImage = ({ priority, src, post }: Props) => {
  const { isMobile } = useIsMobile();
  const { data } = useUser({ userId: post.authorId });
  const { data: postData } = usePost({ postId: post.id });
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
        height={size}
        alt={`${data?.username} - ${shortDescription}`}
      />
    </>
  );
};
