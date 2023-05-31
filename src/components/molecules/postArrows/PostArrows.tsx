import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import clsx from 'clsx';

import { PostImage } from '@/src/services/userPosts.service';

import styles from './PostArrows.module.scss';

import { VisuallyHidden } from '../../atoms/visuallyHiddenText/VisuallyHidden';
import { PostSliderProgress } from '../../organisms/post/postSlider/PostSliderProgress';

type Props = {
  postImages: Array<PostImage>;
  currentIndex: number;
  prevImage: () => void;
  nextImage: () => void;
};

export const PostArrows = ({ prevImage, nextImage, postImages, currentIndex }: Props) => {
  const isNotFirstIndex = currentIndex !== 0;
  const isNotLastIndex = currentIndex !== postImages.length - 1;
  const isSingleImage = postImages.length === 1;

  return (
    <>
      {!isSingleImage && (
        <>
          {isNotFirstIndex && (
            <button type="button" className={styles.button} onClick={prevImage}>
              <IconArrowLeft />
              <VisuallyHidden>Previous image</VisuallyHidden>
            </button>
          )}
          <PostSliderProgress currentIndex={currentIndex} images={postImages} />
          {isNotLastIndex && (
            <button type="button" className={clsx(styles.buttonRight, styles.button)} onClick={nextImage}>
              <IconArrowRight />
              <VisuallyHidden>Next image</VisuallyHidden>
            </button>
          )}
        </>
      )}
    </>
  );
};
