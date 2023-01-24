import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import clsx from 'clsx';
import { useState } from 'react';

import styles from './postSlider.module.scss';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { descriptionData } from '@/components/organisms/homepagePost/description';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

type PropsTypes = {
  post: PostData;
};

export const PostSlider = ({ post }: PropsTypes) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const { description, image1, image2, image3, images } = post;
  const { shortDescription } = descriptionData(description);
  const { data } = useAccount({ userId: post.author_id });
  const postImages = [image1, image2, image3].filter((item) => item !== null);

  const prevImage = () => {
    if (currentImage === 0) {
      return;
    }
    setCurrentImage((prevImage) => prevImage - 1);
  };

  const nextImage = () => {
    if (currentImage === postImages.length - 1) {
      return;
    }
    setCurrentImage((prevImage) => prevImage + 1);
  };

  if (postImages.length === 0 && images) {
    return (
      <MotionImage
        className={styles.image}
        src={images}
        width={300}
        height={300}
        alt={`${data?.user?.username} - ${shortDescription}`}
      />
    );
  }

  return (
    <div className={styles.imagesContainer}>
      {currentImage !== 0 && postImages.length > 0 && (
        <button type="button" className={styles.button} onClick={prevImage}>
          <IconArrowLeft />
        </button>
      )}
      {postImages.map((image, idx) => {
        if (!image) {
          return null;
        }

        return (
          <MotionImage
            key={`${post.id} - ${shortDescription} - ${image}`}
            className={styles.sliderImage}
            src={image}
            width={400}
            height={400}
            initial={{ opacity: 0 }}
            animate={currentImage === idx ? { x: 0, opacity: 1 } : { x: -1 * idx * 100, opacity: 0 }}
            alt={`${data?.user?.username} - ${shortDescription}`}
          />
        );
      })}

      {currentImage !== postImages.length - 1 && postImages.length > 0 && (
        <button type="button" className={clsx(styles.buttonRight, styles.button)} onClick={nextImage}>
          <IconArrowRight />
        </button>
      )}
    </div>
  );
};
