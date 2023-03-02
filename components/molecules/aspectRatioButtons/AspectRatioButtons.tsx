import { motion } from 'framer-motion';

import { Button } from '@/components/atoms/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';

import styles from './aspectRatioButtons.module.scss';

import { containerVariants, itemVariants } from '../imagesPreview/ImagesPreview';

type ButtonData = {
  text: string;
  aspectRatio: number;
};
const buttonData: Array<ButtonData> = [
  { text: 'square', aspectRatio: 1 },
  { text: 'portrait', aspectRatio: 4 / 5 },
  { text: 'landscape', aspectRatio: 1.91 / 1 },
];

type PropsTypes = {
  setAspect: (aspect: number) => void;
  aspect: number;
};

export const AspectRatioButtons = ({ setAspect, aspect }: PropsTypes) => {
  return (
    <CreatePostItemContainer>
      <Heading tag="h2">Crop type</Heading>
      <motion.div className={styles.aspectRatioButtons} variants={containerVariants} initial="hidden" animate="show">
        {buttonData.map(({ text, aspectRatio }) => {
          return (
            <motion.div key={aspectRatio} variants={itemVariants} className={styles.container}>
              <Button
                className={styles.button}
                data-testid={`aspect button ${aspect}`}
                variant={aspectRatio === aspect ? undefined : 'secondary'}
                onClick={() => setAspect(aspectRatio)}
              >
                {text}
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
    </CreatePostItemContainer>
  );
};
