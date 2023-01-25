import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import clsx from 'clsx';
import { AnimatePresence, motion, PanInfo, Variants } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

import styles from './postSlider.module.scss';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { descriptionData } from '@/components/organisms/homepagePost/description';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

const imageVariants: Variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

type PropsTypes = {
  post: PostData;
  containerClassName?: string;
  imageClassName?: string;
};

export const PostSlider = ({ post, imageClassName, containerClassName }: PropsTypes) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const customImageClassName = clsx(imageClassName, styles.sliderImage);
  const customContainerClassName = clsx(containerClassName, styles.slider);

  const { description, image1, image2, image3, images } = post;
  const { shortDescription } = descriptionData(description);
  const { data } = useAccount({ userId: post.author_id });
  const constraintsRef = useRef<HTMLDivElement>(null);

  const postImages = [image1, image2, image3].flatMap((str) => (str ? [str] : []));

  const prevImage = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prevImage) => prevImage - 1);
  };

  const nextImage = () => {
    if (currentIndex === postImages.length - 1) {
      return;
    }
    setCurrentIndex((prevImage) => prevImage + 1);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const { offset } = info;
    if (offset.x < -200) {
      nextImage();
    }
    if (offset.x > 200) {
      prevImage();
    }
  };

  if (postImages.length === 0 && images) {
    return (
      <div className={customContainerClassName}>
        <MotionImage
          className={customImageClassName}
          src={images}
          width={300}
          height={300}
          alt={`${data?.user?.username} - ${shortDescription}`}
        />
      </div>
    );
  }

  return (
    <div className={customContainerClassName}>
      {currentIndex !== 0 && postImages.length > 0 && (
        <button type="button" className={styles.button} onClick={prevImage}>
          <IconArrowLeft />
        </button>
      )}
      <motion.div ref={constraintsRef} className={styles.imagesContainer}>
        <AnimatePresence mode="wait">
          {postImages[currentIndex] !== null && (
            <motion.figure
              key={`${post.id} ${currentIndex}`}
              drag="x"
              dragConstraints={constraintsRef}
              whileDrag={{ cursor: 'grab' }}
              onDragEnd={handleDragEnd}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Image
                className={customImageClassName}
                src={postImages[currentIndex]}
                alt={`${data?.user?.username} - ${shortDescription}`}
                height={400}
                width={400}
              />
            </motion.figure>
          )}
        </AnimatePresence>
      </motion.div>
      <ul className={styles.statusDots}>
        {postImages.map((image, idx) => {
          return (
            <motion.li
              key={image}
              className={styles.dot}
              initial={{ opacity: 0.5 }}
              animate={idx === currentIndex ? { opacity: 1 } : { opacity: 0.5 }}
            >
              <span className="visually-hidden">
                image {currentIndex} of {postImages.length}
              </span>
            </motion.li>
          );
        })}
      </ul>

      {currentIndex !== postImages.length - 1 && postImages.length > 0 && (
        <button type="button" className={clsx(styles.buttonRight, styles.button)} onClick={nextImage}>
          <IconArrowRight />
        </button>
      )}
    </div>
  );
};
