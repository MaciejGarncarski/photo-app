import { motion } from 'framer-motion';

import { useAuth } from '@/src/hooks/useAuth';
import { useUser } from '@/src/hooks/useUser';
import { unlock } from '@/src/utils/bodyLock';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { ConfirmationAlert } from '@/src/components/molecules/confirmationAlert/ConfirmationAlert';
import { EditAccountHeading } from '@/src/components/molecules/editAccountHeading/EditAccountHeading';
import { useModal } from '@/src/components/molecules/modal/useModal';
import { TextWithLoader } from '@/src/components/molecules/textWithLoader/TextWithLoader';
import { stageVariant } from '@/src/components/organisms/editAccountStages/stage.animation';
import { useDeleteAvatar } from '@/src/components/pages/editAccount/useDeleteAvatar';

import styles from './stages.module.scss';

type PropsTypes = {
  stageSelectImage: () => void;
  stageCropImage: () => void;
  stagePersonalInfo: () => void;
};

export const SelectOptionStage = ({ stageCropImage, stagePersonalInfo }: PropsTypes) => {
  const {
    sessionUserData: { id: userId },
  } = useAuth();

  const { customImage } = useUser({ userId });
  const { open, close, modalOpen } = useModal();
  const { mutate, isLoading } = useDeleteAvatar();

  if (!userId) {
    return null;
  }

  const removeAvatar = () => {
    mutate(
      { userId },
      {
        onSettled: () => {
          close();
          unlock();
        },
      },
    );
  };

  if (isLoading) {
    return <TextWithLoader text="Removing your avatar.." />;
  }

  return (
    <motion.section
      variants={stageVariant}
      animate="animate"
      exit="exit"
      initial="initial"
      className={styles.stageContainer}
    >
      <EditAccountHeading text="Manage your account" />
      <div className={styles.avatarButtons}>
        <Button type="button" variant="primary" onClick={stageCropImage}>
          {customImage ? 'Update avatar' : 'Upload avatar'}
        </Button>
        {customImage && (
          <Button type="button" variant="secondary" onClick={open}>
            remove avatar
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={stagePersonalInfo}>
          Edit account details
        </Button>
      </div>
      <ConfirmationAlert
        isVisible={modalOpen}
        headingText="Remove your avatar?"
        close={close}
        onConfirm={removeAvatar}
      />
    </motion.section>
  );
};
