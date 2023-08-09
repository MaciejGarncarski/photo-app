'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { HeartAnimation } from '@/src/components/heart-animation/heart-animation';
import { PostArrows } from '@/src/components/post/post-arrows/post-arrows';
import { useHandleLike } from '@/src/components/post/post-buttons/use-handle-like';
import { PostImage } from '@/src/components/post/post-image/post-image';
import { useCarousel } from '@/src/components/post/post-images-carousel/use-carousel';
import { useUpdateWidth } from '@/src/components/post/post-images-carousel/use-update-width';
import { Post } from '@/src/schemas/post.schema';

import styles from './post-images-carousel.module.scss';

type Props = {
  post: Post;
  priority: boolean;
};

export const PostImagesCarousel = ({ post, priority }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { handleLikeWithAnimation, isLikeAnimationShown } = useHandleLike({
    post,
  });
  const { imageRef, width } = useUpdateWidth();
  const { images: postImages } = post;

  const isSingleImage = postImages.length === 1;

  const handlePrevImage = () => {
    setCurrentIndex((prevImage) => prevImage - 1);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevImage) => prevImage + 1);
  };

  const { handleDragEnd, nextImage, prevImage } = useCarousel({
    currentIndex,
    postImages,
    handleNextImage,
    handlePrevImage,
  });

  return (
    <motion.div
      onDoubleClick={handleLikeWithAnimation}
      className={styles.slider}
      data-cy="post slider"
    >
      <HeartAnimation isVisible={isLikeAnimationShown} />
      <motion.div
        className={clsx(!isSingleImage && styles.grab, styles.imagesContainer)}
        drag={isSingleImage ? undefined : 'x'}
        dragConstraints={{ right: 0, left: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.3}
      >
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ x: -1 * currentIndex * width }}
            exit={{ x: currentIndex * width }}
            className={styles.imagesContainer}
            initial={{ x: 0 }}
          >
            {postImages.map((image, mapIndex) => {
              return (
                <motion.figure
                  ref={currentIndex === mapIndex ? imageRef : undefined}
                  className={styles.figure}
                  key={image.fileId}
                >
                  <PostImage
                    height={1200}
                    width={1200}
                    priority={priority}
                    src={image.url}
                    post={post}
                  />
                </motion.figure>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <PostArrows
        currentIndex={currentIndex}
        nextImage={nextImage}
        postImages={postImages}
        prevImage={prevImage}
      />
    </motion.div>
  );
};
