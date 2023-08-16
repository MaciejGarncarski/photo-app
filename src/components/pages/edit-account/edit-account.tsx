'use client';

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { DetailsStage } from '@/src/components/edit-account-stages/details-stage/details-stage';
import { SelectOptionStage } from '@/src/components/edit-account-stages/options-stage/options-stage';
import { UpdateAvatarStage } from '@/src/components/edit-account-stages/update-avatar-stage/update-avatar-stage';

import styles from './edit-account.module.scss';

export type Stages = 'selectImage' | 'cropImage' | 'personalInfo';

export const EditAccount = () => {
  const [stage, setStage] = useState<Stages>('selectImage');
  const { sessionUser } = useAuth();

  const stageSelectImage = () => setStage('selectImage');
  const stageCropImage = () => setStage('cropImage');
  const stagePersonalInfo = () => setStage('personalInfo');

  const userId = sessionUser?.id || '';

  return (
    <main id="main" className={styles.container}>
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
          <UpdateAvatarStage
            key="cropImageStage"
            stagePersonalInfo={stagePersonalInfo}
            stageSelectImage={stageSelectImage}
          />
        )}

        {stage === 'personalInfo' && (
          <DetailsStage
            key="detailsStage"
            stageSelectImage={stageSelectImage}
            userId={userId}
          />
        )}
      </AnimatePresence>
    </main>
  );
};
