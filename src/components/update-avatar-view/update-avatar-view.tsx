'use client';

import Image from 'next/image';
import { useState } from 'react';

import { getPreviewImages } from '@/src/utils/get-preview-images';

import { Button } from '@/src/components/buttons/button/button';
import { CropImage } from '@/src/components/crop-image/crop-image';
import { Loader } from '@/src/components/loader/loader';
import { FinalImages } from '@/src/components/pages/create-post/types';
import { useUploadAvatar } from '@/src/components/update-avatar-view/use-upload-avatar';

import styles from './update-avatar-view.module.scss';

type Props = {
  closeModal: () => void;
};
export const UpdateAvatarView = ({ closeModal }: Props) => {
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const resetFinalImages = () => setFinalImages([]);
  const { onSaveImage, isPending, isFinalImageEmpty } = useUploadAvatar({
    finalImages,
    closeModal,
    resetFinalImages,
  });
  const { previewImages } = getPreviewImages(finalImages);

  if (isPending) {
    return <Loader color="accent" size="big" />;
  }

  const [previewImage] = previewImages;
  const isNewAvatarReady = previewImage?.src;

  return (
    <div className={styles.updateAvatar}>
      {!isNewAvatarReady && (
        <CropImage
          finalImages={finalImages}
          setFinalImages={setFinalImages}
          isAvatarCrop
        />
      )}
      {isNewAvatarReady && (
        <>
          <div className={styles.preview}>
            <Image
              alt="avatar preview"
              src={previewImage?.src}
              width={250}
              height={250}
              className={styles.previewImg}
            />
          </div>
          <div className={styles.buttons}>
            <Button
              type="button"
              variant="primary"
              disabled={isPending || isFinalImageEmpty}
              onClick={onSaveImage}
            >
              Save new image
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
