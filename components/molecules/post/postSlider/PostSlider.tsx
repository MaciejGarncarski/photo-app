import { PostImage as PostImageType } from '@prisma/client';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { PostData } from '@/utils/apis/transformPost';

import { HeartAnimation } from '@/components/atoms/heartAnimation/HeartAnimation';
import { VisuallyHidden } from '@/components/atoms/visuallyHiddenText/VisuallyHidden';
import { useHandleLike } from '@/components/molecules/post/postButtons/useHandleLike';
import { PostImage } from '@/components/molecules/post/postImage/PostImage';
import { PostSliderProgress } from '@/components/molecules/post/postSlider/PostSliderProgress';
import { useSlider } from '@/components/molecules/post/postSlider/useSlider';
import { useUpdateWidth } from '@/components/molecules/post/postSlider/useUpdateWidth';

import styles from './postSlider.module.scss';

type PropsTypes = {
  post: PostData;
  priority: boolean;
};

export const PostSlider = ({ post, priority }: PropsTypes) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { imagesData } = post;
  const { handleLikeWithAnimation, isLikeAnimationShown } = useHandleLike({ post });
  const { imageRef, width } = useUpdateWidth();

  const postImages = imagesData.filter((img): img is PostImageType => !!img);
  const { handleDragEnd, nextImage, prevImage } = useSlider({ currentIndex, postImages, setCurrentIndex });

  if (postImages.length === 1) {
    if (!postImages[0]) {
      return null;
    }

    const { height, width, url } = postImages[0];

    return (
      <figure onDoubleClick={handleLikeWithAnimation} className={styles.slider}>
        <PostImage image={{ height, width, priority, src: url }} post={post} />
        <AnimatePresence>{isLikeAnimationShown && <HeartAnimation />}</AnimatePresence>
      </figure>
    );
  }

  return (
    <motion.div onDoubleClick={handleLikeWithAnimation} className={styles.slider}>
      <AnimatePresence>{isLikeAnimationShown && <HeartAnimation />}</AnimatePresence>
      {currentIndex !== 0 && postImages.length > 0 && (
        <button type="button" className={styles.button} onClick={prevImage}>
          <IconArrowLeft />
          <VisuallyHidden>Previous image</VisuallyHidden>
        </button>
      )}
      <motion.div
        className={styles.imagesContainer}
        drag="x"
        dragConstraints={{ right: 0, left: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.3}
        key={width}
      >
        <AnimatePresence>
          <motion.div className={styles.imagesContainer} animate={{ x: -1 * currentIndex * width }}>
            {postImages.map(({ height, width, fileId, url }, idx) => {
              return (
                <motion.figure ref={currentIndex === idx ? imageRef : undefined} className={styles.figure} key={fileId}>
                  <PostImage image={{ src: url, height, width, priority: priority && idx > 1 }} post={post} />
                </motion.figure>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <PostSliderProgress currentIndex={currentIndex} images={postImages} />
      {currentIndex !== postImages.length - 1 && postImages.length > 0 && (
        <button type="button" className={clsx(styles.buttonRight, styles.button)} onClick={nextImage}>
          <IconArrowRight />
          <VisuallyHidden>Next image</VisuallyHidden>
        </button>
      )}
    </motion.div>
  );
};
