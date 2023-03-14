import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { useConvertToBase64 } from '@/hooks/useConvertToBase64';

import { Button } from '@/components/atoms/buttons/button/Button';
import { TextWithLoader } from '@/components/atoms/textWithLoader/TextWithLoader';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { stageVariant } from '@/components/organisms/editAccountStages/SelectOptionStage';
import { useUploadAvatar } from '@/components/organisms/editAccountStages/useUploadAvatar';
import { FinalImages, ImagesBase64 } from '@/components/pages/createPost/types';

import styles from './stages.module.scss';

type PropsTypes = {
  finalImages: FinalImages;
  setFinalImages: (finalImg: FinalImages) => void;
  stageSelectImage: () => void;
  stagePersonalInfo: () => void;
};

export const CropImageStage = ({ finalImages, setFinalImages, stagePersonalInfo, stageSelectImage }: PropsTypes) => {
  const [finalImagesBase64, setFinalImagesBase64] = useState<ImagesBase64>([undefined]);
  useConvertToBase64(finalImages, setFinalImagesBase64);

  const { onSaveImage, uploadImageLoading, editAccountLoading, isFinalImageEmpty } = useUploadAvatar({
    finalImages,
    setFinalImages,
    stagePersonalInfo,
  });

  const selectDiffrentImg = () => {
    setFinalImages([]);
  };

  if (editAccountLoading || uploadImageLoading) {
    return <TextWithLoader text="Uploading new avatar.." />;
  }

  const isNewAvatarReady = Boolean(finalImagesBase64[0]?.src);

  return (
    <motion.div
      variants={stageVariant}
      animate="animate"
      exit="exit"
      initial="initial"
      className={styles.stageContainer}
    >
      {isNewAvatarReady ? (
        <figure className={styles.preview}>
          <figcaption className={styles.previewFigcaption}>new avatar preview</figcaption>
          {finalImagesBase64[0]?.src && (
            <Image
              alt="avatar preview"
              src={finalImagesBase64[0]?.src}
              width={300}
              height={300}
              className={styles.previewImg}
            />
          )}
        </figure>
      ) : (
        <CropImage setFinalImages={setFinalImages} finalImages={finalImages} aspectRatio={1} />
      )}
      <div className={styles.buttons}>
        {isNewAvatarReady && (
          <Button type="button" variant="secondary" onClick={selectDiffrentImg}>
            select diffrent image
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={stageSelectImage}>
          go back
        </Button>
        <Button
          type="button"
          disabled={editAccountLoading || uploadImageLoading || isFinalImageEmpty}
          onClick={onSaveImage}
        >
          Save new image
        </Button>
      </div>
    </motion.div>
  );
};
