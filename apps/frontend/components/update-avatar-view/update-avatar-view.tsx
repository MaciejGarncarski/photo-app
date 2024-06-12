"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/buttons/button/button";
import { CropImage } from "@/components/crop-image/crop-image";
import { Loader } from "@/components/loader/loader";
import type { FinalImages } from "@/components/pages/create-post/create-post-schema";
import { usePreviewImages } from "@/components/pages/create-post/use-preview-images";
import { useUploadAvatar } from "@/components/update-avatar-view/use-upload-avatar";

import styles from "./update-avatar-view.module.scss";

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
  const { previewImages } = usePreviewImages(finalImages);

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
