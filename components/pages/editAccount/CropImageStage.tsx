import { motion as m } from 'framer-motion';
import { useState } from 'react';

import styles from './editAccount.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { FinalImages } from '@/components/pages/createPost/CreatePost';
import { stageVariant } from '@/components/pages/editAccount/SelectImageStage';

type PropsTypes = {
  finalImages: FinalImages;
  setFinalImages: (finalImg: FinalImages) => void;
  stageSelectImage: () => void;
  stagePersonalInfo: () => void;
};

export const CropImageStage = ({ finalImages, setFinalImages, stagePersonalInfo, stageSelectImage }: PropsTypes) => {
  const [isCropping, setIsCropping] = useState<boolean>(false);

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
          back to beginning
        </Button>
        <Button type="button" onClick={stagePersonalInfo}>
          next
        </Button>
      </div>
    </m.div>
  );
};
