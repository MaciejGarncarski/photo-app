import { motion } from 'framer-motion';
import Image from 'next/image';

import { useFinalImages } from '@/src/hooks/useFinalImages';
import { getPreviewImages } from '@/src/utils/getPreviewImages';

import { Button } from '@/src/components/atoms/buttons/button/Button';

import { CropImage } from '@/src/components/organisms/cropImage/CropImage';
import { useUploadAvatar } from '@/src/components/organisms/editAccountStages/newAvatarStage/useUploadAvatar';
import { stageVariant } from '@/src/components/organisms/editAccountStages/stage.animation';
import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import styles from '../stages.module.scss';

type PropsTypes = {
  stageSelectImage: () => void;
  stagePersonalInfo: () => void;
};

export const NewAvatarStage = ({ stagePersonalInfo, stageSelectImage }: PropsTypes) => {
  const { finalImages, resetFinalImages } = useFinalImages();
  const { previewImages } = getPreviewImages(finalImages);
  const { onSaveImage, uploadImageLoading, editAccountLoading, isFinalImageEmpty } = useUploadAvatar({
    stagePersonalInfo,
  });

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
      {isNewAvatarReady ? (
        <figure className={styles.preview}>
          <figcaption className={styles.previewFigcaption}>new avatar preview</figcaption>
          {isNewAvatarReady && (
            <Image
              alt="avatar preview"
              src={previewImage?.src}
              width={300}
              height={300}
              className={styles.previewImg}
            />
          )}
        </figure>
      ) : (
        <CropImage />
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
