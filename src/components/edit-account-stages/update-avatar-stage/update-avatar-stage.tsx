import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { getPreviewImages } from '@/src/utils/get-preview-images';

import { Button } from '@/src/components/buttons/button/button';
import { CropImage } from '@/src/components/crop-image/crop-image';
import { stageVariant } from '@/src/components/edit-account-stages/stage.animation';
import { useUploadAvatar } from '@/src/components/edit-account-stages/update-avatar-stage/use-upload-avatar';
import { Loader } from '@/src/components/loader/loader';
import { FinalImages } from '@/src/components/pages/create-post/types';

import styles from '../stages.module.scss';

type Props = {
  stageSelectImage: () => void;
  stagePersonalInfo: () => void;
};

export const UpdateAvatarStage = ({
  stagePersonalInfo,
  stageSelectImage,
}: Props) => {
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const resetFinalImages = () => setFinalImages([]);
  const { onSaveImage, isLoading, isFinalImageEmpty } = useUploadAvatar({
    stagePersonalInfo,
    finalImages,
    resetFinalImages,
  });
  const { previewImages } = getPreviewImages(finalImages);

  if (isLoading) {
    return <Loader color="accent" size="small" marginTop />;
  }

  const [previewImage] = previewImages;
  const isNewAvatarReady = previewImage?.src;

  return (
    <motion.div
      variants={stageVariant}
      animate="animate"
      exit="exit"
      initial="initial"
      className={styles.stageContainer}
    >
      {!isNewAvatarReady && (
        <CropImage
          finalImages={finalImages}
          setFinalImages={setFinalImages}
          isAvatarCrop
        />
      )}
      {isNewAvatarReady && (
        <figure className={styles.preview}>
          <figcaption className={styles.previewFigcaption}>
            new avatar preview
          </figcaption>
          <Image
            alt="avatar preview"
            src={previewImage?.src}
            width={300}
            height={300}
            className={styles.previewImg}
          />
        </figure>
      )}
      <div className={styles.buttons}>
        {isNewAvatarReady && (
          <Button type="button" variant="secondary" onClick={resetFinalImages}>
            Select other image
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={stageSelectImage}>
          Go back
        </Button>
        <Button
          type="button"
          variant="primary"
          disabled={isLoading || isFinalImageEmpty}
          onClick={onSaveImage}
        >
          Save new image
        </Button>
      </div>
    </motion.div>
  );
};
