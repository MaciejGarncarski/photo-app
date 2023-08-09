import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import clsx from 'clsx';

import { PostSliderProgress } from '@/src/components/post/post-images-carousel/carousel-progress';
import { PostImage } from '@/src/services/userPosts.service';

import styles from './post-arrows.module.scss';

type Props = {
  postImages: Array<PostImage>;
  currentIndex: number;
  prevImage: () => void;
  nextImage: () => void;
};

export const PostArrows = ({
  prevImage,
  nextImage,
  postImages,
  currentIndex,
}: Props) => {
  const isNotFirstIndex = currentIndex !== 0;
  const isNotLastIndex = currentIndex !== postImages.length - 1;
  const isSingleImage = postImages.length === 1;

  if (isSingleImage) {
    return null;
  }

  return (
    <>
      {isNotFirstIndex && (
        <button type="button" className={styles.button} onClick={prevImage}>
          <IconArrowLeft />
          <span className="visually-hidden">Previous</span>
        </button>
      )}
      <PostSliderProgress currentIndex={currentIndex} images={postImages} />
      {isNotLastIndex && (
        <button
          type="button"
          className={clsx(styles.buttonRight, styles.button)}
          onClick={nextImage}
        >
          <IconArrowRight />
          <span className="visually-hidden">Next</span>
        </button>
      )}
    </>
  );
};
