import { motion as m, Variants } from 'framer-motion';
import { useState } from 'react';

import styles from './editAccount.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { ConfirmationModal } from '@/components/molecules/confirmationModal/ConfirmationModal';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';
import { useDeleteAvatar } from '@/components/pages/editAccount/useDeleteAvatar';

type PropsTypes = {
  stageSelectImage: () => void;
  stageCropImage: () => void;
  stagePersonalInfo: () => void;
};

export const stageVariant: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { scale: 0.7, opacity: 0 },
};

export const SelectImageStage = ({ stageCropImage, stagePersonalInfo }: PropsTypes) => {
  const { session } = useAuth();

  const userId = session?.user?.id;
  const { data } = useAccount({ userId });

  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const { mutate } = useDeleteAvatar();

  if (!userId) {
    return <Loading />;
  }

  return (
    <m.section
      variants={stageVariant}
      animate="animate"
      exit="exit"
      initial="initial"
      className={styles.stageContainer}
    >
      <Heading tag="h2">1. Avatar</Heading>

      <div className={styles.buttons}>
        <Button type="button" onClick={stageCropImage}>
          Update avatar
        </Button>
        {data?.user.customImage && (
          <Button type="button" variant="secondary" onClick={() => setIsRemoving(true)}>
            remove avatar
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={stagePersonalInfo}>
          skip to next stage
        </Button>
      </div>
      {isRemoving && (
        <ConfirmationModal
          confirmText="Delete"
          onCancel={() => setIsRemoving(false)}
          onConfirm={() => mutate({ userId })}
          setIsOpen={setIsRemoving}
        />
      )}
    </m.section>
  );
};
