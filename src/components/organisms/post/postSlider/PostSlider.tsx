import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { useIsMobile } from '@/src/hooks/useIsMobile';

import { HeartAnimation } from '@/src/components/atoms/heartAnimation/HeartAnimation';

import { PostArrows } from '@/src/components/molecules/postArrows/PostArrows';

import { useHandleLike } from '@/src/components/organisms/post/postButtons/useHandleLike';
import { PostImage } from '@/src/components/organisms/post/postImage/PostImage';
import { useSlider } from '@/src/components/organisms/post/postSlider/useSlider';
import { useUpdateWidth } from '@/src/components/organisms/post/postSlider/useUpdateWidth';

import { Post } from '@/src/schemas/post.schema';

import styles from './PostSlider.module.scss';

type PropsTypes = {
  post: Post;
  priority: boolean;
};

export const PostSlider = ({ post, priority }: PropsTypes) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { handleLikeWithAnimation, isLikeAnimationShown } = useHandleLike({ post });
  const { imageRef, width } = useUpdateWidth();
  const { isMobile } = useIsMobile();
  const { images: postImages } = post;

  const isSingleImage = postImages.length === 1;

  const handlePrevImage = () => {
    setCurrentIndex((prevImage) => prevImage - 1);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevImage) => prevImage + 1);
  };

  const { handleDragEnd, nextImage, prevImage } = useSlider({
    currentIndex,
    postImages,
    handleNextImage,
    handlePrevImage,
  });

  return (
    <motion.div onDoubleClick={handleLikeWithAnimation} className={styles.slider}>
      <HeartAnimation isVisible={isLikeAnimationShown} />
      <motion.div
        className={clsx(styles.imagesContainer, isSingleImage && styles.singleImageContainer)}
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
                  <PostImage height={1200} width={1200} priority={priority} src={image.url} post={post} />
                </motion.figure>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <PostArrows currentIndex={currentIndex} nextImage={nextImage} postImages={postImages} prevImage={prevImage} />
    </motion.div>
  );
};
