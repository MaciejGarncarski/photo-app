import { motion } from 'framer-motion';

import { PostImage } from '@/src/components/atoms/accountPost/AccountPost';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './postSlider.module.scss';

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
            initial={{ opacity: 0.5 }}
            animate={idx === currentIndex ? { opacity: 1 } : { opacity: 0.45 }}
          >
            <VisuallyHidden>
              image {currentIndex} of {images.length}
            </VisuallyHidden>
          </motion.li>
        );
      })}
    </ul>
  );
};
