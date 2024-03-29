import { CameraPlus, Trash } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { PreviewImages } from '@/src/utils/get-preview-images';

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
      <div className={styles.previewContainer}>
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
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0 }}
              key={image.id}
              className={styles.previewButton}
            >
              <button
                type="button"
                onClick={() => onRemove(image.id)}
                className={styles.deleteIcon}
              >
                <Trash />
                <span className="visually-hidden">remove image</span>
              </button>
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
      </div>
    </div>
  );
};
