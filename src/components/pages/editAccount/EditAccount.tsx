import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';

import { SelectOptionStage } from '@/src/components/organisms/editAccountStages/optionsStage/SelectOptionStage';

import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

import styles from './EditAccount.module.scss';

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

export const EditAccount = () => {
  const [stage, setStage] = useState<Stages>('selectImage');
  const { sessionUser } = useAuth();

  const stageSelectImage = () => setStage('selectImage');
  const stageCropImage = () => setStage('cropImage');
  const stagePersonalInfo = () => setStage('personalInfo');

  const userId = sessionUser?.id || '';

  return (
    <ProtectedPage shouldBeSignedIn>
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
    </ProtectedPage>
  );
};
