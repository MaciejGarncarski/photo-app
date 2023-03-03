import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import { SelectOptionStage } from '@/components/pages/editAccount/SelectOptionStage';

import styles from './editAccount.module.scss';

import { FinalImages } from '../createPost/types';

type PropsTypes = {
  userId: string;
};

const LazyCropImageStage = dynamic(
  async () => {
    return import('@/components/pages/editAccount/CropImageStage').then(({ CropImageStage }) => CropImageStage);
  },
  { ssr: false },
);

const LazyDetailsStage = dynamic(
  async () => {
    return import('@/components/pages/editAccount/DetailsStage').then(({ DetailsStage }) => DetailsStage);
  },
  { ssr: false },
);

export type Stages = 'selectImage' | 'cropImage' | 'personalInfo';

export const EditAccount = ({ userId }: PropsTypes) => {
  const [stage, setStage] = useState<Stages>('selectImage');
  const [finalImages, setFinalImages] = useState<FinalImages>([]);

  const stageSelectImage = () => setStage('selectImage');
  const stageCropImage = () => setStage('cropImage');
  const stagePersonalInfo = () => setStage('personalInfo');

  return (
    <main id="main" className={styles.container}>
      <NextSeo title="Edit account" />
      <AnimatePresence mode="wait">
        {stage === 'selectImage' && (
          <SelectOptionStage
            key="selectOptionStage"
            stageCropImage={stageCropImage}
            stagePersonalInfo={stagePersonalInfo}
            stageSelectImage={stageSelectImage}
          />
        )}

        {stage === 'cropImage' && (
          <LazyCropImageStage
            key="cropImageStage"
            finalImages={finalImages}
            setFinalImages={setFinalImages}
            stagePersonalInfo={stagePersonalInfo}
            stageSelectImage={stageSelectImage}
          />
        )}

        {stage === 'personalInfo' && (
          <LazyDetailsStage key="detailsStage" stageSelectImage={stageSelectImage} userId={userId} />
        )}
      </AnimatePresence>
    </main>
  );
};
