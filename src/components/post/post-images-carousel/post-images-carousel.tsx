'use client';

import { motion } from 'framer-motion';

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
  const { data: post, isPending } = usePost({ postId });
  const { width, imageRef } = useUpdateWidth();

  const { handleLikeWithAnimation, isLikeAnimationShown } = useHandleLike({
    postId,
    isLiked: post?.isLiked || false,
  });

  const { handleDragEnd, handleNextImage, handlePrevImage, currentIndex } =
    useCarousel({
      postImages: post?.images || [],
    });

  if (isPending || !post) {
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
        <motion.div
          ref={imageRef}
          animate={{
            x: `calc(calc(${-1 * width}px - var(--gap)) * ${currentIndex})`,
            transition: {
              ease: 'linear',
            },
          }}
          className={styles.imagesContainer}
        >
          {post.images.map((image) => {
            return (
              <motion.div className={styles.image} key={image.fileId}>
                <PostImage
                  priority={priority}
                  src={image.url}
                  postId={post.id}
                />
              </motion.div>
            );
          })}
        </motion.div>
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
