import { PostImage } from '@prisma/client';
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

type PostImageProps = {
  src: string;
  placeholder?: string;
  imagePriority?: boolean;
  width: number;
  height: number;
};

export const PostSlider = ({ post, imageClassName, containerClassName, priority }: PropsTypes) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const { username } = useUser({ userId: post.authorId });
  const { session } = useAuth();
  const { postId, isLiked } = post;
  const router = useRouter();
  useUpdateWidth(imageRef, setWidth);
  const { mutate } = usePostLike();

  const { description, imagesData, postPlaceholders } = post;
  const { shortDescription } = descriptionData(description);

  const postImages = imagesData.filter((img): img is PostImage => !!img);
  const { handleDragEnd, nextImage, prevImage } = useSlider({ currentIndex, postImages, setCurrentIndex });
  const customContainerClassName = clsx(containerClassName, styles.slider);

  const handleLike = () => {
    if (!session?.user?.id) {
      return router.push('/auth/signin');
    }
    mutate({ isLiked: isLiked ?? false, userId: session.user.id, postId });
  };

  const PostImage = ({ src, imagePriority, width, height, placeholder }: PostImageProps) => {
    return (
      <MotionImage
        className={clsx(imageClassName, styles.sliderImage)}
        src={src}
        priority={imagePriority ?? Boolean(priority)}
        width={width}
        height={height}
        blurDataURL={placeholder}
        placeholder={placeholder ? 'blur' : undefined}
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
        <PostImage
          placeholder={postPlaceholders[0]}
          src={postImages[0].url}
          width={postImages[0].width}
          height={postImages[0].height}
        />
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
              if (!image) {
                return null;
              }

              return (
                <motion.figure className={styles.figure} key={image.fileId}>
                  <PostImage
                    placeholder={postPlaceholders[idx]}
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    imagePriority={idx === 0}
                  />
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
