import { IconPhotoPlus, IconTrash } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { PreviewImages } from '@/src/utils/getPreviewImages';

import { Heading } from '@/src/components/atoms/heading/Heading';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { containerVariants, itemVariants } from '@/src/components/molecules/imagesPreview/ImagesPreview.animation';

import styles from './ImagesPreview.module.scss';

const MAX_IMAGES_LENGTH = 3;

type PropsTypes = {
  onRemove: (id: number) => void;
  previewImages: PreviewImages;
};

export const ImagesPreview = ({ onRemove, previewImages }: PropsTypes) => {
  const emptyImagesLength = MAX_IMAGES_LENGTH - previewImages.length;
  const arrayOfEmptyImages = Array.from({ length: emptyImagesLength }, (_, el) => el);

  return (
    <div>
      <Heading tag="h2" size="medium">
        Images in post
      </Heading>
      <motion.div className={styles.previewContainer} variants={containerVariants} initial="hidden" animate="show">
        {previewImages.map((image) => {
          if (!image?.src) {
            return null;
          }

          return (
            <motion.div key={image.id} className={styles.previewButton} variants={itemVariants}>
              <motion.button
                whileFocus={{ scale: 1.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => onRemove(image.id)}
                className={styles.deleteIcon}
              >
                <IconTrash />
                <VisuallyHidden>remove image</VisuallyHidden>
              </motion.button>
              <Image className={styles.imgPreview} src={image.src} alt="image preview" width={200} height={200} />
            </motion.div>
          );
        })}

        {arrayOfEmptyImages.map((id) => {
          return (
            <motion.button variants={itemVariants} key={id} disabled type="button" className={styles.emptySpace}>
              <IconPhotoPlus />
              <p>empty</p>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
