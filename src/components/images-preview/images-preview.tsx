import { IconPhotoPlus, IconTrash } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { PreviewImages } from '@/src/utils/get-preview-images';

import {
  containerVariants,
  itemVariants,
} from '@/src/components/images-preview/images-preview.animation';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './images-preview.module.scss';

const MAX_IMAGES_LENGTH = 3;

type Props = {
  onRemove: (id: string) => void;
  previewImages: PreviewImages;
};

export const ImagesPreview = ({ onRemove, previewImages }: Props) => {
  const emptyImagesLength = MAX_IMAGES_LENGTH - previewImages.length;
  const arrayOfEmptyImages = Array.from(
    { length: emptyImagesLength },
    (_, el) => el,
  );

  return (
    <div>
      <Heading tag="h2" size="medium">
        2. Images in post
      </Heading>
      <motion.div
        className={styles.previewContainer}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {previewImages.map((image) => {
          if (!image?.src) {
            return null;
          }

          return (
            <motion.div
              key={image.id}
              className={styles.previewButton}
              variants={itemVariants}
            >
              <motion.button
                whileFocus={{ scale: 1.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => onRemove(image.id)}
                className={styles.deleteIcon}
              >
                <IconTrash />
                <span className="visually-hidden">remove image</span>
              </motion.button>
              <Image
                className={styles.imgPreview}
                src={image.src}
                alt="image preview"
                width={200}
                height={200}
              />
            </motion.div>
          );
        })}

        {arrayOfEmptyImages.map((id) => {
          return (
            <motion.button
              variants={itemVariants}
              key={id}
              disabled
              type="button"
              className={styles.emptySpace}
            >
              <IconPhotoPlus />
              <p>empty</p>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
