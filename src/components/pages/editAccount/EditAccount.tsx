import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import { SelectOptionStage } from '@/src/components/organisms/editAccountStages/optionsStage/SelectOptionStage';

import styles from './editAccount.module.scss';

type PropsTypes = {
  userId: string;
};

const NewAvatarStageLazy = dynamic(
  async () => {
    return import('@/src/components/organisms/editAccountStages/newAvatarStage/NewAvatarStage').then(
      ({ NewAvatarStage }) => NewAvatarStage,
    );
  },
  { ssr: false },
);

const LazyDetailsStage = dynamic(
  async () => {
    return import('@/src/components/organisms/editAccountStages/detailsStage/DetailsStage').then(
      ({ DetailsStage }) => DetailsStage,
    );
  },
  { ssr: false },
);

export type Stages = 'selectImage' | 'cropImage' | 'personalInfo';

export const EditAccount = ({ userId }: PropsTypes) => {
  const [stage, setStage] = useState<Stages>('selectImage');

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
          <NewAvatarStageLazy
            key="cropImageStage"
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
