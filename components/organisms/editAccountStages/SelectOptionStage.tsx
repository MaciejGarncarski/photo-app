import { motion, Variants } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { unlock } from '@/utils/bodyLock';

import { Button } from '@/components/atoms/buttons/button/Button';
import { TextWithLoader } from '@/components/atoms/textWithLoader/TextWithLoader';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { EditAccountHeading } from '@/components/molecules/editAccountHeading/EditAccountHeading';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { useDeleteAvatar } from '@/components/pages/editAccount/useDeleteAvatar';

import styles from './stages.module.scss';

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
      <ModalContainer>
        {modalOpen && <ConfirmationAlert headingText="Remove your avatar?" close={close} onConfirm={removeAvatar} />}
      </ModalContainer>
    </motion.section>
  );
};
