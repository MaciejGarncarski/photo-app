import { PostImage } from '@prisma/client';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { useUser } from '@/hooks/useUser';
import { PostData } from '@/utils/transformPost';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { HeartAnimation } from '@/components/atoms/heartAnimation/HeartAnimation';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { useHandleLike } from '@/components/molecules/post/postButtons/useHandleLike';
import { PostSliderProgress } from '@/components/molecules/post/postSlider/PostSliderProgress';
import { useSlider } from '@/components/molecules/post/postSlider/useSlider';
import { useUpdateWidth } from '@/components/molecules/post/postSlider/useUpdateWidth';
import { descriptionData } from '@/components/organisms/homePost/description';

import styles from './postSlider.module.scss';

type PropsTypes = {
  post: PostData;
  containerClassName?: string;
  imageClassName?: string;
};

type PostImageProps = {
  src: string;
  placeholder?: string;
  priority?: boolean;
  width: number;
  height: number;
};

const TIMEOUT = 1000;

export const PostSlider = ({ post, imageClassName, containerClassName }: PropsTypes) => {
  const { description, imagesData, isLiked } = post;
  const postImages = imagesData.filter((img): img is PostImage => !!img);
  const [isLikeAnimationShown, setIsLikeAnimationShown] = useState<boolean>(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { handleDragEnd, nextImage, prevImage } = useSlider({ currentIndex, postImages, setCurrentIndex });
  const { username } = useUser({ userId: post.authorId });

  const { imageRef, width } = useUpdateWidth();
  const customContainerClassName = clsx(containerClassName, styles.slider);
  const { shortDescription } = descriptionData(description);
  const { handleLike } = useHandleLike({ post });

  const handleLikeWithAnimation = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (!isLiked) {
      handleLike();
    }

    setIsLikeAnimationShown(true);
    timeoutId.current = setTimeout(() => {
      setIsLikeAnimationShown(false);
    }, TIMEOUT);
  };

  const PostImage = ({ src, priority, width, height }: PostImageProps) => {
    return (
      <MotionImage
        className={clsx(imageClassName, styles.sliderImage)}
        src={src}
        priority={priority}
        width={width}
        height={height}
        alt={`${username} - ${shortDescription}`}
      />
    );
  };

  if (postImages.length === 1) {
    if (!postImages[0]) {
      return null;
    }
    return (
      <figure onDoubleClick={handleLikeWithAnimation} className={customContainerClassName}>
        <PostImage src={postImages[0].url} width={postImages[0].width} height={postImages[0].height} priority />
        <AnimatePresence>{isLikeAnimationShown && <HeartAnimation />}</AnimatePresence>
      </figure>
    );
  }

  return (
    <motion.div onDoubleClick={handleLikeWithAnimation} className={customContainerClassName}>
      <AnimatePresence>{isLikeAnimationShown && <HeartAnimation />}</AnimatePresence>
      {currentIndex !== 0 && postImages.length > 0 && (
        <button type="button" className={styles.button} onClick={prevImage}>
          <IconArrowLeft />
          <VisuallyHiddenText text="Previous image" />
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
            {postImages.map((image, idx) => {
              return (
                <motion.figure
                  ref={currentIndex === idx ? imageRef : undefined}
                  className={styles.figure}
                  key={image.fileId}
                >
                  <PostImage src={image.url} width={image.width} height={image.height} priority={idx === 0} />
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
          <VisuallyHiddenText text="Next image" />
        </button>
      )}
    </motion.div>
  );
};
