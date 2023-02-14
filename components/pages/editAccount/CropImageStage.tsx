import { useQueryClient } from '@tanstack/react-query';
import { motion as m } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/atoms/button/Button';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { FinalImages } from '@/components/pages/createPost/CreatePost';
import { useUploadImage } from '@/components/pages/createPost/useUploadImage';
import { stageVariant } from '@/components/pages/editAccount/SelectImageStage';
import { useEditAccount } from '@/components/pages/editAccount/useEditAccount';

import styles from './editAccount.module.scss';

type PropsTypes = {
  finalImages: FinalImages;
  setFinalImages: (finalImg: FinalImages) => void;
  stageSelectImage: () => void;
  stagePersonalInfo: () => void;
};

export const CropImageStage = ({ finalImages, setFinalImages, stagePersonalInfo, stageSelectImage }: PropsTypes) => {
  const queryClient = useQueryClient();
  const [isCropping, setIsCropping] = useState<boolean>(false);

  const uploadImage = useUploadImage();
  const editAccount = useEditAccount();

  const { session } = useAuth();

  const isFinalImageEmpty = finalImages.filter((image) => !!image).length === 0;

  const onSaveImage = async () => {
    if (isFinalImageEmpty) {
      return;
    }
    if (!finalImages[0]?.file) {
      return toast.error('Image not detected');
    }
    if (!session?.user?.id) {
      return;
    }
    const userId = session.user.id;

    const folder = `${userId}/avatar/custom/`;
    const imageUrl = await uploadImage.mutateAsync({ imageBlob: finalImages[0].file, folder });

    await editAccount.mutateAsync(
      { newAvatarUrl: imageUrl, userId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(['account', userId]);
          stagePersonalInfo();
        },
        onSettled: () => {
          setFinalImages([undefined]);
        },
      },
    );
  };

  return (
    <m.div variants={stageVariant} animate="animate" exit="exit" initial="initial" className={styles.stageContainer}>
      <CropImage
        isCropping={isCropping}
        setIsCropping={setIsCropping}
        finalImages={finalImages}
        setFinalImages={setFinalImages}
        aspectRatio={1}
      />
      <div className={styles.buttons}>
        <Button type="button" variant="secondary" onClick={stageSelectImage}>
          go back
        </Button>
        <Button
          type="button"
          disabled={uploadImage.isLoading || editAccount.isLoading || isFinalImageEmpty}
          onClick={onSaveImage}
        >
          Save new image
        </Button>
      </div>
    </m.div>
  );
};
