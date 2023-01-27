import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { Suspense, useState } from 'react';

import { Loading } from '@/components/atoms/loading/Loading';
import { useAccount } from '@/components/pages/account/useAccount';
import { FinalImages } from '@/components/pages/createPost/CreatePost';
import { SelectImageStage } from '@/components/pages/editAccount/SelectImageStage';

import styles from './editAccount.module.scss';

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
              finalImages={finalImages}
              setFinalImages={setFinalImages}
              stagePersonalInfo={stagePersonalInfo}
              stageSelectImage={stageSelectImage}
            />
          )}

          {stage === 'personalInfo' && (
            <LazyDetailsStage
              key="detailsStage"
              stageSelectImage={stageSelectImage}
              finalImages={finalImages}
              userId={userId}
            />
          )}
        </AnimatePresence>
      </Suspense>
    </main>
  );
};
