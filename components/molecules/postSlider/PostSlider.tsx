import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
import { useSlider } from '@/components/molecules/postSlider/useSlider';
import { useUpdateWidth } from '@/components/molecules/postSlider/useUpdateWidth';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { descriptionData } from '@/components/organisms/homepagePost/description';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './postSlider.module.scss';

type PropsTypes = {
  post: PostData;
  containerClassName?: string;
  imageClassName?: string;
};

export const PostSlider = ({ post, imageClassName, containerClassName }: PropsTypes) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const { data } = useAccount({ userId: post.author_id });
  const { session } = useAuth();
  const router = useRouter();
  useUpdateWidth(imageRef, setWidth);
  const { mutate } = usePostLike();

  const { description, image1, image2, image3, images } = post;
  const { shortDescription } = descriptionData(description);

  const postImages = [image1, image2, image3].flatMap((str) => (str ? [str] : []));
  const { handleDragEnd, nextImage, prevImage } = useSlider({ currentIndex, postImages, setCurrentIndex });

  const customImageClassName = clsx(imageClassName, styles.sliderImage);
  const customContainerClassName = clsx(containerClassName, styles.slider);

  const handleLike = () => {
    if (!session?.user?.id) {
      router.push('/auth/signin');
      return;
    }
    mutate({ isLiked: post.isLiked ?? false, userId: session?.user?.id, postId: post.id });
  };

  if (postImages.length === 1) {
    if (!postImages[0]) {
      return null;
    }
    return (
      <div onDoubleClick={handleLike} className={customContainerClassName}>
        <MotionImage
          className={customImageClassName}
          src={postImages[0]}
          width={300}
          height={300}
          alt={`${data?.user?.username} - ${shortDescription}`}
        />
      </div>
    );
  }

  if (postImages.length === 0 && images) {
    return (
      <div onDoubleClick={handleLike} className={customContainerClassName}>
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
    <motion.div onDoubleClick={handleLike} className={customContainerClassName}>
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
        dragTransition={{
          bounceStiffness: 350,
        }}
      >
        <AnimatePresence>
          <motion.div
            className={styles.imagesContainer}
            animate={{ x: -1 * currentIndex * (width / postImages.length) }}
            ref={imageRef}
          >
            {postImages.map((image, idx) => {
              return (
                <motion.figure className={styles.figure} key={`${post.id} ${image} ${currentIndex}`}>
                  <Image
                    className={customImageClassName}
                    src={image}
                    alt={`${data?.user?.username} - ${shortDescription}`}
                    height={400}
                    width={400}
                    priority={idx > 0}
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
