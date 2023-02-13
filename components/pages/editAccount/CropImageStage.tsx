import { useQueryClient } from '@tanstack/react-query';
import { motion as m } from 'framer-motion';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/atoms/button/Button';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { FinalImages } from '@/components/pages/createPost/CreatePost';
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

  const { mutate, isLoading: isMutationLoading } = useEditAccount();
  const { session } = useAuth();

  const isFinalImageEmpty = finalImages.filter((image) => !!image).length === 0;

  const onSaveImage = () => {
    if (isFinalImageEmpty) {
      return;
    }

    mutate(
      { image: finalImages[0]?.file, userId: session?.user?.id ?? '' },
      {
        onSuccess: async () => {
          if (!session?.user?.id) {
            return;
          }
          await queryClient.invalidateQueries(['account', session.user.id]);
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
        <Button type="button" disabled={isMutationLoading || isFinalImageEmpty} onClick={onSaveImage}>
          Save new image
        </Button>
      </div>
    </m.div>
  );
};
