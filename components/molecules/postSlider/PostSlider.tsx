import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import clsx from 'clsx';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

import styles from './postSlider.module.scss';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { useUpdateWidth } from '@/components/molecules/postSlider/useUpdateWidth';
import { descriptionData } from '@/components/organisms/homepagePost/description';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

type PropsTypes = {
  post: PostData;
  containerClassName?: string;
  imageClassName?: string;
};

const CHANGE_IMG_OFFSET = 150;

export const PostSlider = ({ post, imageClassName, containerClassName }: PropsTypes) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const { data } = useAccount({ userId: post.author_id });

  const { description, image1, image2, image3, images } = post;
  const { shortDescription } = descriptionData(description);

  const customImageClassName = clsx(imageClassName, styles.sliderImage);
  const customContainerClassName = clsx(containerClassName, styles.slider);

  const postImages = [image1, image2, image3].flatMap((str) => (str ? [str] : []));

  useUpdateWidth(imageRef, setWidth);

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
    if (offset.x < CHANGE_IMG_OFFSET * -1) {
      nextImage();
    }
    if (offset.x > CHANGE_IMG_OFFSET) {
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
    <motion.div className={customContainerClassName}>
      {currentIndex !== 0 && postImages.length > 0 && (
        <button type="button" className={styles.button} onClick={prevImage}>
          <IconArrowLeft />
        </button>
      )}
      <motion.div
        className={styles.imagesContainer}
        drag="x"
        dragConstraints={{ right: 0, left: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.3}
      >
        <AnimatePresence>
          <motion.div
            className={styles.imagesContainer}
            animate={{ x: -1 * currentIndex * (width / postImages.length) }}
            ref={imageRef}
          >
            {postImages.map((image) => {
              return (
                <motion.figure key={`${post.id} ${image} ${currentIndex}`}>
                  <Image
                    className={customImageClassName}
                    src={image}
                    alt={`${data?.user?.username} - ${shortDescription}`}
                    height={400}
                    width={400}
                  />
                </motion.figure>
              );
            })}
          </motion.div>
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
    </motion.div>
  );
};
