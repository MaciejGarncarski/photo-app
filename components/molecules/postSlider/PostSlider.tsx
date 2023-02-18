import { PostImage } from '@prisma/client';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { useUser } from '@/hooks/useUser';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { useHandleLike } from '@/components/molecules/postButtons/useHandleLike';
import { PostSliderProgress } from '@/components/molecules/postSlider/PostSliderProgress';
import { useSlider } from '@/components/molecules/postSlider/useSlider';
import { useUpdateWidth } from '@/components/molecules/postSlider/useUpdateWidth';
import { descriptionData } from '@/components/organisms/homepagePost/description';
import { PostData } from '@/components/pages/collection/useCollection';

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

export const PostSlider = ({ post, imageClassName, containerClassName }: PropsTypes) => {
  const { description, imagesData } = post;
  const postImages = imagesData.filter((img): img is PostImage => !!img);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const { handleDragEnd, nextImage, prevImage } = useSlider({ currentIndex, postImages, setCurrentIndex });
  const { username } = useUser({ userId: post.authorId });

  useUpdateWidth(imageRef, setWidth);

  const customContainerClassName = clsx(containerClassName, styles.slider);
  const { shortDescription } = descriptionData(description);

  const { handleLike } = useHandleLike({ post });
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
      <figure onDoubleClick={handleLike} className={customContainerClassName}>
        <PostImage src={postImages[0].url} width={postImages[0].width} height={postImages[0].height} priority />
      </figure>
    );
  }

  return (
    <motion.div onDoubleClick={handleLike} className={customContainerClassName}>
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
        dragElastic={0.4}
        dragTransition={{ bounceStiffness: 500 }}
      >
        <AnimatePresence>
          <motion.div
            className={styles.imagesContainer}
            animate={{ x: -1 * currentIndex * (width / postImages.length) }}
            ref={imageRef}
          >
            {postImages.map((image, idx) => {
              if (!image) {
                return null;
              }

              return (
                <motion.figure className={styles.figure} key={image.fileId}>
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
