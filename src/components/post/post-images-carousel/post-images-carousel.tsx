'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

import { HeartAnimation } from '@/src/components/heart-animation/heart-animation';
import { usePost } from '@/src/components/pages/account/use-post';
import { PostArrows } from '@/src/components/post/post-arrows/post-arrows';
import { useHandleLike } from '@/src/components/post/post-buttons/use-handle-like';
import { PostImage } from '@/src/components/post/post-image/post-image';
import { getVariants } from '@/src/components/post/post-images-carousel/get-variants';
import { useCarousel } from '@/src/components/post/post-images-carousel/use-carousel';
import { useUpdateWidth } from '@/src/components/post/post-images-carousel/use-update-width';

import styles from './post-images-carousel.module.scss';

type Props = {
  postId: number;
  priority: boolean;
};

export const PostImagesCarousel = ({ postId, priority }: Props) => {
  const { data: post, isLoading } = usePost({ postId });

  const { handleLikeWithAnimation, isLikeAnimationShown } = useHandleLike({
    postId,
    isLiked: post?.isLiked || false,
  });
  const { imageRef, width } = useUpdateWidth();

  const { handleDragEnd, handleNextImage, handlePrevImage, currentIndex } =
    useCarousel({
      postImages: post?.images || [],
    });

  const listVariants = useMemo(
    () => getVariants({ currentIndex, width }),
    [currentIndex, width],
  );

  if (isLoading || !post) {
    return null;
  }

  const isSingleImage = post.images.length <= 1;

  return (
    <motion.div
      onDoubleClick={handleLikeWithAnimation}
      className={styles.slider}
      data-cy="post slider"
    >
      <HeartAnimation isVisible={isLikeAnimationShown} />
      <motion.div
        drag={isSingleImage ? undefined : 'x'}
        dragConstraints={{ right: 0, left: 0 }}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
        dragElastic={0.5}
        whileDrag={{ cursor: 'grabbing' }}
        style={{
          cursor: isSingleImage ? 'auto' : 'grab',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            variants={listVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.imagesContainer}
          >
            {post.images.map((image, mapIndex) => {
              return (
                <motion.div
                  ref={currentIndex === mapIndex ? imageRef : undefined}
                  className={styles.image}
                  key={image.fileId}
                >
                  <PostImage priority={priority} src={image.url} post={post} />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <PostArrows
        currentIndex={currentIndex}
        handleNextImage={handleNextImage}
        postImages={post.images}
        handlePrevImage={handlePrevImage}
      />
    </motion.div>
  );
};
