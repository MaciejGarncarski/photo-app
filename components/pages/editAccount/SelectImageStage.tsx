import { motion as m, Variants } from 'framer-motion';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { LoadingHeading } from '@/components/atoms/loadingHeading/LoadingHeading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';
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

export const SelectImageStage = ({ stageCropImage, stagePersonalInfo }: PropsTypes) => {
  const { session } = useAuth();

  const userId = session?.user?.id;
  const { data } = useAccount({ userId });

  const { open, close, modalOpen } = useModal();

  const { mutate, isLoading } = useDeleteAvatar();

  if (!userId) {
    return <Loading />;
  }
  const removeAvatar = () => {
    mutate({ userId }, { onSettled: close });
  };

  if (isLoading) {
    return <LoadingHeading headingText="Removing your avatar.." />;
  }

  return (
    <m.section
      variants={stageVariant}
      animate="animate"
      exit="exit"
      initial="initial"
      className={styles.stageContainer}
    >
      <Heading tag="h2">Edit your account</Heading>
      <div className={styles.avatarButtons}>
        <Button type="button" onClick={stageCropImage}>
          Update avatar
        </Button>
        {data?.user?.customImage && (
          <Button type="button" variant="secondary" onClick={open}>
            remove avatar
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={stagePersonalInfo}>
          Edit details
        </Button>
      </div>
      <ModalContainer>
        {modalOpen && <ConfirmationAlert headingText="Delete Avatar?" close={close} onConfirm={removeAvatar} />}
      </ModalContainer>
    </m.section>
  );
};
