import { motion } from 'framer-motion';

import { Button } from '@/components/atoms/buttons/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';
import { buttonData } from '@/components/molecules/aspectRatioButtons/buttonData';
import { containerVariants, itemVariants } from '@/components/molecules/imagesPreview/ImagesPreview';

import styles from './aspectRatioButtons.module.scss';

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
                type="button"
                data-testid={`aspect button ${aspect}`}
                variant={aspectRatio === aspect ? 'primary' : 'secondary'}
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
