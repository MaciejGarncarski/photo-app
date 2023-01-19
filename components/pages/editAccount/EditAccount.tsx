import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { Suspense, useState } from 'react';

import { namedComponent } from '@/utils/namedComponent';

import styles from './editAccount.module.scss';

import { Loading } from '@/components/atoms/loading/Loading';
import { useAccount } from '@/components/pages/account/useAccount';
import { SelectImageStage } from '@/components/pages/editAccount/SelectImageStage';

type PropsTypes = {
  userId: string;
};

const LazyCropImageStage = dynamic(
  async () => {
    return namedComponent(import('@/components/pages/editAccount/CropImageStage'), 'CropImageStage');
  },
  { ssr: false },
);

const LazyPersonalInfoStage = dynamic(
  async () => {
    return namedComponent(import('@/components/pages/editAccount/PersonalInfoStage'), 'PersonalInfoStage');
  },
  { ssr: false },
);

export type Stages = 'selectImage' | 'cropImage' | 'personalInfo';

export const EditAccount = ({ userId }: PropsTypes) => {
  const [stage, setStage] = useState<Stages>('selectImage');
  const [finalImg, setFinalImg] = useState<Blob | null>(null);

  const { data } = useAccount({ userId });

  const stageSelectImage = () => setStage('selectImage');
  const stageCropImage = () => setStage('cropImage');
  const stagePersonalInfo = () => setStage('personalInfo');

  return (
    <main id="main" className={styles.container}>
      <NextSeo title={`@${data?.user?.username} - Edit account`} />

      <Suspense fallback={<Loading variants={['center']} />}>
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
            <LazyCropImageStage
              key="cropImageStage"
              setFinalImg={setFinalImg}
              stagePersonalInfo={stagePersonalInfo}
              stageSelectImage={stageSelectImage}
            />
          )}

          {stage === 'personalInfo' && (
            <LazyPersonalInfoStage
              key="personalInfoStage"
              finalImg={finalImg}
              stageSelectImage={stageSelectImage}
              userId={userId}
            />
          )}
        </AnimatePresence>
      </Suspense>
    </main>
  );
};
