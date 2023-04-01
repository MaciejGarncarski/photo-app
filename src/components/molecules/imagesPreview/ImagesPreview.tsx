import { IconPhotoPlus, IconTrash } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { ImagesBase64 } from '@/utils/getFinalImagesBase64';

import { Heading } from '@/components/atoms/heading/Heading';
import { VisuallyHidden } from '@/components/atoms/visuallyHiddenText/VisuallyHidden';
import { containerVariants, itemVariants } from '@/components/molecules/imagesPreview/ImagesPreview.animation';

import styles from './imagesPreview.module.scss';

type PropsTypes = {
  onRemove: (id: string) => void;
  imagesBase64: ImagesBase64;
};

export const ImagesPreview = ({ onRemove, imagesBase64 }: PropsTypes) => {
  const emptyImagesLength = 3 - imagesBase64.length;
  const arrayOfEmptyImages = Array.from({ length: emptyImagesLength }, (_, el) => el);

  return (
    <div>
      <Heading tag="h2" size="medium">
        Images in post
      </Heading>
      <motion.div className={styles.previewContainer} variants={containerVariants} initial="hidden" animate="show">
        {imagesBase64.map((finalImage) => {
          if (!finalImage?.src) {
            return null;
          }

          return (
            <motion.div key={finalImage.id} className={styles.previewButton} variants={itemVariants}>
              <motion.button
                whileFocus={{ scale: 1.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => onRemove(finalImage.id)}
                className={styles.deleteIcon}
              >
                <IconTrash />
                <VisuallyHidden>remove image</VisuallyHidden>
              </motion.button>

              {imagesBase64 && (
                <Image
                  className={styles.imgPreview}
                  src={finalImage.src}
                  alt="image preview"
                  width={200}
                  height={200}
                />
              )}
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
