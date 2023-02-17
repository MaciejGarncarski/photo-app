import { PostImage } from '@prisma/client';
import { motion } from 'framer-motion';

import styles from './postSlider.module.scss';

type PostSliderProps = {
  currentIndex: number;
  images: Array<PostImage | null>;
};

export const PostSliderProgress = ({ currentIndex, images }: PostSliderProps) => {
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
            animate={idx === currentIndex ? { opacity: 1 } : { opacity: 0.5 }}
          >
            <span className="visually-hidden">
              image {currentIndex} of {images.length}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
};
