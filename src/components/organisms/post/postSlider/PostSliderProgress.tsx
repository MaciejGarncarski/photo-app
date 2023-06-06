import { motion } from 'framer-motion';

import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { PostImage } from '@/src/services/userPosts.service';

import styles from './PostSlider.module.scss';

type PropsTypes = {
  currentIndex: number;
  images: Array<PostImage>;
};

export const PostSliderProgress = ({ currentIndex, images }: PropsTypes) => {
  return (
    <ul className={styles.postSliderProgress}>
      {images.map((image, idx) => {
        if (!image) {
          return null;
        }

        return (
          <motion.li
            key={image.id}
            className={styles.progressDot}
            animate={idx === currentIndex ? { opacity: 1 } : { opacity: 0.45 }}
          >
            <VisuallyHidden>image {idx}</VisuallyHidden>
          </motion.li>
        );
      })}
    </ul>
  );
};
