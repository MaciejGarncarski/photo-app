import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
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
  priority?: boolean;
};

export const PostSlider = ({ post, imageClassName, containerClassName, priority }: PropsTypes) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const { username } = useUser({ userId: post.author_id });
  const { session } = useAuth();
  const { id, isLiked } = post;
  const router = useRouter();
  useUpdateWidth(imageRef, setWidth);
  const { mutate } = usePostLike();

  const { description, image1, image2, image3, images } = post;
  const { shortDescription } = descriptionData(description);

  const postImages = [image1, image2, image3].flatMap((str) => (str ? [str] : []));
  const { handleDragEnd, nextImage, prevImage } = useSlider({ currentIndex, postImages, setCurrentIndex });
  const customContainerClassName = clsx(containerClassName, styles.slider);

  const handleLike = () => {
    if (!session?.user?.id) {
      return router.push('/auth/signin');
    }
    mutate({ isLiked: isLiked ?? false, userId: session.user.id, postId: id });
  };

  const PostImage = ({ src, imagePriority }: { src: string; imagePriority?: boolean }) => {
    return (
      <MotionImage
        className={clsx(imageClassName, styles.sliderImage)}
        src={src}
        priority={imagePriority ?? Boolean(priority)}
        width={900}
        height={900}
        alt={`${username} - ${shortDescription}`}
      />
    );
  };

  if (postImages.length === 1) {
    if (!postImages[0]) {
      return null;
    }
    return (
      <div onDoubleClick={handleLike} className={customContainerClassName}>
        <PostImage src={postImages[0]} />
      </div>
    );
  }

  if (postImages.length === 0 && images) {
    return (
      <div onDoubleClick={handleLike} className={customContainerClassName}>
        <PostImage src={images} />
      </div>
    );
  }

  return (
    <motion.div onDoubleClick={handleLike} className={customContainerClassName}>
      {currentIndex !== 0 && postImages.length > 0 && (
        <button type="button" className={styles.button} onClick={prevImage}>
          <IconArrowLeft />
          <span className="visually-hidden">Previous image</span>
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
              return (
                <motion.figure className={styles.figure} key={`${post.id} ${image} ${currentIndex}`}>
                  <PostImage src={image} imagePriority={priority && idx === 0} />
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
          <span className="visually-hidden">Next image</span>
        </button>
      )}
    </motion.div>
  );
};
