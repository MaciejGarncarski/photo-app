import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { arrowVariants } from '@/components/post/post-arrows/post-arrows.animation';
import { PostSliderProgress } from '@/components/post/post-images-carousel/carousel-progress';
import type { PostImage } from '@/schemas/post.schema';

import styles from './post-arrows.module.scss';

type Props = {
  postImages: Array<PostImage>;
  currentIndex: number;
  handlePrevImage: () => void;
  handleNextImage: () => void;
};

export const PostArrows = ({
  handlePrevImage,
  handleNextImage,
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
        <motion.button
          type="button"
          className={styles.button}
          onClick={handlePrevImage}
          variants={arrowVariants}
          whileTap="tap"
          whileHover="hover"
        >
          <ArrowLeft />
          <span className="visually-hidden">Previous</span>
        </motion.button>
      )}
      <PostSliderProgress currentIndex={currentIndex} images={postImages} />
      {isNotLastIndex && (
        <motion.button
          type="button"
          className={clsx(styles.buttonRight, styles.button)}
          onClick={handleNextImage}
          variants={arrowVariants}
          whileTap="tap"
          whileHover="hover"
        >
          <ArrowRight />
          <span className="visually-hidden">Next</span>
        </motion.button>
      )}
    </>
  );
};
