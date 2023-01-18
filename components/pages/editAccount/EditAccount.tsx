import { AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import styles from './editAccount.module.scss';

import { useAccount } from '@/components/pages/account/useAccount';
import { CropImageStage } from '@/components/pages/editAccount/CropImageStage';
import { PersonalInfoStage } from '@/components/pages/editAccount/PersonalInfoStage';
import { SelectImageStage } from '@/components/pages/editAccount/SelectImageStage';

type PropsTypes = {
  userId: string;
};

export type Stages = 'selectImage' | 'cropImage' | 'personalInfo';

export const EditAccount = ({ userId }: PropsTypes) => {
  const { data } = useAccount({ userId });

  const [stage, setStage] = useState<Stages>('selectImage');
  const [finalImg, setFinalImg] = useState<Blob | null>(null);

  const stageSelectImage = () => setStage('selectImage');
  const stageCropImage = () => setStage('cropImage');
  const stagePersonalInfo = () => setStage('personalInfo');

  return (
    <main id="main" className={styles.container}>
      <NextSeo title={`@${data?.user.username} - Edit account`} />

      <AnimatePresence mode="wait">
        {stage === 'selectImage' && (
          <SelectImageStage
            key="selectImageStage"
            stageCropImage={stageCropImage}
            stagePersonalInfo={stagePersonalInfo}
            stageSelectImage={stageSelectImage}
          />
        )}

        {stage === 'cropImage' && (
          <CropImageStage
            key="cropImageStage"
            setFinalImg={setFinalImg}
            stagePersonalInfo={stagePersonalInfo}
            stageSelectImage={stageSelectImage}
          />
        )}

        {stage === 'personalInfo' && (
          <PersonalInfoStage
            key="personalInfoStage"
            finalImg={finalImg}
            stageSelectImage={stageSelectImage}
            userId={userId}
          />
        )}
      </AnimatePresence>
    </main>
  );
};
