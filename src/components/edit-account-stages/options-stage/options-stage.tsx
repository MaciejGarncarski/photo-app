import { Trash } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

import { useAuth } from '@/src/hooks/use-auth';

import { Button } from '@/src/components/buttons/button/button';
import { EditAccountHeading } from '@/src/components/edit-account-heading/edit-account-heading';
import { useOptionsStage } from '@/src/components/edit-account-stages/options-stage/use-options-stage';
import { stageVariant } from '@/src/components/edit-account-stages/stage.animation';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';

import styles from '../stages.module.scss';

type Props = {
  stageSelectImage: () => void;
  stageCropImage: () => void;
  stagePersonalInfo: () => void;
};

export const SelectOptionStage = ({
  stageCropImage,
  stagePersonalInfo,
}: Props) => {
  const { sessionUser } = useAuth();
  const customImage = sessionUser?.customImage;

  const { isPending, isModalOpen, openModal, removeAvatar, closeModal } =
    useOptionsStage();

  if (isPending) {
    return null;
    // todo
    // return <TextWithLoader text="Removing your avatar.." />;
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
      <ConfirmationDialog
        isVisible={isModalOpen}
        text="Do you want to remove your avatar?"
        closeModal={closeModal}
      >
        <Button variant="destructive" onClick={removeAvatar}>
          Remove forever
          <Trash />
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ConfirmationDialog>
    </motion.section>
  );
};
