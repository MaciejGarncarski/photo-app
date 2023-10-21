import { CameraPlus, Trash } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { PreviewImages } from '@/src/utils/get-preview-images';

import { containerVariants } from '@/src/components/images-preview/images-preview.animation';

import styles from './images-preview.module.scss';

const MAX_IMAGES_LENGTH = 3;

type Props = {
  onRemove: (id: string) => void;
  previewImages: PreviewImages;
};

export const ImagesPreview = ({ onRemove, previewImages }: Props) => {
  const emptyImagesLength = MAX_IMAGES_LENGTH - previewImages.length;

  const placeholders = Array.from({ length: emptyImagesLength }, (_, el) => el);

  const images = [...previewImages, ...placeholders];

  return (
    <div>
      <motion.div
        className={styles.previewContainer}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {images.map((image) => {
          if (!image || typeof image === 'number') {
            return (
              <button
                key={image}
                disabled
                type="button"
                className={styles.emptySpace}
              >
                <CameraPlus />
                Empty
              </button>
            );
          }
          return (
            <motion.div key={image.id} className={styles.previewButton}>
              <motion.button
                whileFocus={{ scale: 1.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => onRemove(image.id)}
                className={styles.deleteIcon}
              >
                <Trash />
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
      </motion.div>
    </div>
  );
};
