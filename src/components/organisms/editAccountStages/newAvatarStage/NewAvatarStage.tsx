import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { getPreviewImages } from '@/src/utils/getPreviewImages';

import { Button } from '@/src/components/atoms/buttons/button/Button';

import { CropImage } from '@/src/components/organisms/cropImage/CropImage';
import { useUploadAvatar } from '@/src/components/organisms/editAccountStages/newAvatarStage/useUploadAvatar';
import { stageVariant } from '@/src/components/organisms/editAccountStages/stage.animation';
import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import { FinalImages } from '@/src/components/pages/createPost/types';

import styles from '../Stages.module.scss';

type PropsTypes = {
  stageSelectImage: () => void;
  stagePersonalInfo: () => void;
};

export const NewAvatarStage = ({ stagePersonalInfo, stageSelectImage }: PropsTypes) => {
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const resetFinalImages = () => setFinalImages([]);
  const { onSaveImage, uploadImageLoading, editAccountLoading, isFinalImageEmpty } = useUploadAvatar({
    stagePersonalInfo,
    finalImages,
    resetFinalImages,
  });
  const { previewImages } = getPreviewImages(finalImages);

  if (editAccountLoading || uploadImageLoading) {
    return <TextWithLoader text="Uploading new avatar.." />;
  }

  const previewImage = previewImages[0];
  const isNewAvatarReady = previewImage?.src;

  return (
    <motion.div
      variants={stageVariant}
      animate="animate"
      exit="exit"
      initial="initial"
      className={styles.stageContainer}
    >
      {!isNewAvatarReady && <CropImage finalImages={finalImages} setFinalImages={setFinalImages} />}
      {isNewAvatarReady && (
        <figure className={styles.preview}>
          <figcaption className={styles.previewFigcaption}>new avatar preview</figcaption>
          <Image alt="avatar preview" src={previewImage?.src} width={300} height={300} className={styles.previewImg} />
        </figure>
      )}
      <div className={styles.buttons}>
        {isNewAvatarReady && (
          <Button type="button" variant="secondary" onClick={resetFinalImages}>
            select diffrent image
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={stageSelectImage}>
          go back
        </Button>
        <Button
          type="button"
          variant="primary"
          disabled={editAccountLoading || uploadImageLoading || isFinalImageEmpty}
          onClick={onSaveImage}
        >
          Save new image
        </Button>
      </div>
    </motion.div>
  );
};
