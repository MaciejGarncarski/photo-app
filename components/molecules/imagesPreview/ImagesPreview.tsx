import { IconPhotoPlus, IconTrash } from '@tabler/icons';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

import styles from './imagesPreview.module.scss';

import { Heading } from '@/components/atoms/heading/Heading';
import { ImagesBase64 } from '@/components/pages/createPost/CreatePost';

type PropsTypes = {
  onRemove: (id: number) => void;
  imagesBase64: ImagesBase64;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const ImagesPreview = ({ imagesBase64, onRemove }: PropsTypes) => {
  const emptyImagesLength = 3 - imagesBase64.length;

  return (
    <div>
      <Heading tag="h2">Images in post</Heading>
      <motion.div className={styles.previewContainer} variants={container} initial="hidden" animate="show">
        {imagesBase64.map((finalImage) => {
          if (finalImage?.src) {
            return (
              <motion.button
                onClick={() => onRemove(finalImage.id)}
                key={`${finalImage.id} - preview`}
                className={styles.previewButton}
                type="button"
                variants={item}
              >
                <div className={styles.deleteIconOverlay}>
                  <IconTrash />
                </div>

                {imagesBase64 && (
                  <Image
                    className={styles.imgPreview}
                    src={finalImage.src}
                    alt="image preview"
                    width={200}
                    height={200}
                  />
                )}
                <span className="visually-hidden">remove image</span>
              </motion.button>
            );
          }

          return null;
        })}

        {Array.from({ length: emptyImagesLength }, (_, el) => el).map((id) => {
          return (
            <motion.button
              variants={item}
              key={`${id} - empty space`}
              disabled
              type="button"
              className={styles.emptySpace}
            >
              <IconPhotoPlus />
              <span className="visually-hidden">empty space for image</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
