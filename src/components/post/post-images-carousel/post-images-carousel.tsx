'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { HeartAnimation } from '@/src/components/heart-animation/heart-animation';
import { usePost } from '@/src/components/pages/account/use-post';
import { PostArrows } from '@/src/components/post/post-arrows/post-arrows';
import { useHandleLike } from '@/src/components/post/post-buttons/use-handle-like';
import { PostImage } from '@/src/components/post/post-image/post-image';
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

  const { handleDragEnd, nextImage, prevImage, currentIndex } = useCarousel({
    postImages: post?.images || [],
  });

  if (isLoading || !post) {
    return null;
  }

  const isSingleImage = true;

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
            {post.images.map((image, mapIndex) => {
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
        postImages={post.images}
        prevImage={prevImage}
      />
    </motion.div>
  );
};
