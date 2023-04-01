import { motion } from 'framer-motion';
import Image from 'next/image';

import { getFinalImagesBase64 } from '@/utils/getFinalImagesBase64';

import { Button } from '@/components/atoms/buttons/button/Button';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { TextWithLoader } from '@/components/molecules/textWithLoader/TextWithLoader';
import { stageVariant } from '@/components/organisms/editAccountStages/stage.animation';
import { useUploadAvatar } from '@/components/organisms/editAccountStages/useUploadAvatar';
import { FinalImages } from '@/components/pages/createPost/types';

import styles from './stages.module.scss';

type PropsTypes = {
  finalImages: FinalImages;
  setFinalImages: (finalImg: FinalImages) => void;
  stageSelectImage: () => void;
  stagePersonalInfo: () => void;
};

export const CropImageStage = ({ finalImages, setFinalImages, stagePersonalInfo, stageSelectImage }: PropsTypes) => {
  const { imagesBase64 } = getFinalImagesBase64(finalImages);

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

  const isNewAvatarReady = Boolean(imagesBase64[0]?.src);

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
          {imagesBase64[0]?.src && (
            <Image
              alt="avatar preview"
              src={imagesBase64[0]?.src}
              width={300}
              height={300}
              className={styles.previewImg}
            />
          )}
        </figure>
      ) : (
        <CropImage setFinalImages={setFinalImages} finalImages={finalImages} />
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
