import { motion } from 'framer-motion';

import { useAuth } from '@/src/hooks/useAuth';

import { Button } from '@/src/components/atoms/buttons/button/Button';

import { EditAccountHeading } from '@/src/components/molecules/editAccountHeading/EditAccountHeading';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { useOptionsStage } from '@/src/components/organisms/editAccountStages/optionsStage/useOptionsStage';
import { stageVariant } from '@/src/components/organisms/editAccountStages/stage.animation';
import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import styles from '../Stages.module.scss';

type PropsTypes = {
  stageSelectImage: () => void;
  stageCropImage: () => void;
  stagePersonalInfo: () => void;
};

export const SelectOptionStage = ({
  stageCropImage,
  stagePersonalInfo,
}: PropsTypes) => {
  const { sessionUser } = useAuth();
  const customImage = sessionUser?.customImage;

  const { isLoading, isModalOpen, openModal, removeAvatar, closeModal } =
    useOptionsStage();

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
          <Button type="button" variant="secondary" onClick={openModal}>
            remove avatar
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={stagePersonalInfo}>
          Edit account details
        </Button>
      </div>
      <ConfirmationAlert
        isVisible={isModalOpen}
        headingText="Remove your avatar?"
        closeModal={closeModal}
        onConfirm={removeAvatar}
      />
    </motion.section>
  );
};
