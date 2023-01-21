import { motion as m } from 'framer-motion';

import styles from './editAccount.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { stageVariant } from '@/components/pages/editAccount/SelectImageStage';

type PropsTypes = {
  setFinalImg: (finalImg: Blob | null) => void;
  stageSelectImage: () => void;
  stagePersonalInfo: () => void;
};

export const CropImageStage = ({ setFinalImg, stagePersonalInfo, stageSelectImage }: PropsTypes) => {
  return (
    <m.div variants={stageVariant} animate="animate" exit="exit" initial="initial" className={styles.stageContainer}>
      <CropImage setFinalImg={setFinalImg} aspectRatio={1} />
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
