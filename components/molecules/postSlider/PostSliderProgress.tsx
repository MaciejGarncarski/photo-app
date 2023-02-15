import { motion } from 'framer-motion';

import styles from './postSlider.module.scss';

export const PostSliderProgress = ({ currentIndex, images }: { currentIndex: number; images: Array<string> }) => {
  return (
    <ul className={styles.postSliderProgress}>
      {images.map((image, idx) => {
        return (
          <motion.li
            key={image}
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
