import { motion, Variants } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/button/Button';
import { EditAccountHeading } from '@/components/atoms/editAccountHeading/EditAccountHeading';
import { LoadingHeading } from '@/components/atoms/loadingHeading/LoadingHeading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { useDeleteAvatar } from '@/components/pages/editAccount/useDeleteAvatar';

import styles from './editAccount.module.scss';

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
    mutate({ userId }, { onSettled: close });
  };

  if (isLoading) {
    return <LoadingHeading headingText="Removing your avatar.." />;
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
        <Button type="button" onClick={stageCropImage}>
          Update avatar
        </Button>
        {customImage && (
          <Button type="button" variant="secondary" onClick={open}>
            remove avatar
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={stagePersonalInfo}>
          Edit details
        </Button>
      </div>
      <ModalContainer>
        {modalOpen && <ConfirmationAlert headingText="Remove your avatar?" close={close} onConfirm={removeAvatar} />}
      </ModalContainer>
    </motion.section>
  );
};
