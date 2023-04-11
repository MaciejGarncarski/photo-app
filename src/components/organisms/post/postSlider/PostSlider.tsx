import { PostImage as PostImageType } from '@prisma/client';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { HeartAnimation } from '@/src/components/atoms/heartAnimation/HeartAnimation';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { useHandleLike } from '@/src/components/organisms/post/postButtons/useHandleLike';
import { PostImage } from '@/src/components/organisms/post/postImage/PostImage';
import { PostSliderProgress } from '@/src/components/organisms/post/postSlider/PostSliderProgress';
import { useSlider } from '@/src/components/organisms/post/postSlider/useSlider';
import { useUpdateWidth } from '@/src/components/organisms/post/postSlider/useUpdateWidth';

import { Post } from '@/src/consts/schemas';

import styles from './PostSlider.module.scss';

type PropsTypes = {
  post: Post;
  priority: boolean;
};

export const PostSlider = ({ post, priority }: PropsTypes) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { handleLikeWithAnimation, isLikeAnimationShown } = useHandleLike({ post });
  const { imageRef, width } = useUpdateWidth();
  const postImages = post.imagesData.filter((img): img is PostImageType => !!img);

  const { handleDragEnd, nextImage, prevImage, isNotFirstIndex, isNotLastIndex, isSingleImage } = useSlider({
    currentIndex,
    postImages,
    setCurrentIndex,
  });

  return (
    <motion.div onDoubleClick={handleLikeWithAnimation} className={styles.slider}>
      <HeartAnimation isVisible={isLikeAnimationShown} />
      <motion.div
        className={styles.imagesContainer}
        drag={isSingleImage ? undefined : 'x'}
        dragConstraints={{ right: 0, left: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.3}
      >
        <AnimatePresence>
          <motion.div className={styles.imagesContainer} animate={{ x: -1 * currentIndex * width }}>
            {postImages.map(({ height, width, fileId, url }, idx) => {
              return (
                <motion.figure ref={currentIndex === idx ? imageRef : undefined} className={styles.figure} key={fileId}>
                  <PostImage height={height} priority={priority || idx === 1} src={url} width={width} post={post} />
                </motion.figure>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>
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
    </motion.div>
  );
};
