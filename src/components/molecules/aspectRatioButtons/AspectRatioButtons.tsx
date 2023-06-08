import { motion } from 'framer-motion';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { Heading } from '@/src/components/atoms/heading/Heading';

import { buttonData } from '@/src/components/molecules/aspectRatioButtons/buttonData';
import { containerVariants } from '@/src/components/molecules/imagesPreview/ImagesPreview.animation';

import styles from './AspectRatioButtons.module.scss';

type PropsTypes = {
  setAspect: (aspect: number) => void;
  aspect: number;
};

export const AspectRatioButtons = ({ setAspect, aspect }: PropsTypes) => {
  return (
    <section className={styles.container}>
      <Heading tag="h3" size="small">
        Choose desired aspect ratio
      </Heading>
      <motion.div
        className={styles.aspectRatioButtons}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {buttonData.map(({ text, aspectRatio }) => {
          return (
            <Button
              type="button"
              variant={aspectRatio === aspect ? 'primary' : 'secondary'}
              onClick={() => setAspect(aspectRatio)}
              key={aspectRatio}
            >
              {text}
            </Button>
          );
        })}
      </motion.div>
    </section>
  );
};
