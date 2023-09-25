import { FloppyDisk } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

import { Button } from '@/src/components/buttons/button/button';
import { EditAccountHeading } from '@/src/components/edit-account-heading/edit-account-heading';
import { useDetailsStage } from '@/src/components/edit-account-stages/details-stage/use-details-stage';
import { stageVariant } from '@/src/components/edit-account-stages/stage.animation';
import { Input } from '@/src/components/input/input';
import { Loader } from '@/src/components/loader/loader';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';
import { TextArea } from '@/src/components/textarea/text-area';

import styles from '../stages.module.scss';

type Props = {
  userId: string;
  stageSelectImage: () => void;
};

export const DetailsStage = ({ userId, stageSelectImage }: Props) => {
  const {
    closeModal,
    editAccountLoading,
    errors,
    formRef,
    isDirty,
    isError,
    isLoading,
    isModalOpen,
    onClick,
    onReset,
    onSubmit,
    register,
  } = useDetailsStage({ userId });

  if (isLoading) {
    return null;
  }

  if (editAccountLoading) {
    return <Loader color="accent" size="small" marginTop />;
  }

  return (
    <>
      <EditAccountHeading text="Edit details" />
      <motion.form
        variants={stageVariant}
        animate="animate"
        exit="exit"
        initial="initial"
        className={styles.form}
        ref={formRef}
      >
        <Input
          type="text"
          labelText="Username"
          placeholder="Username"
          variant="primary"
          error={errors.username?.message}
          {...register('username')}
        />
        <Input
          type="text"
          labelText="Full name"
          placeholder="Full name"
          variant="primary"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <TextArea
          error={errors.bio?.message}
          placeholder="Aa"
          label="Bio"
          {...register('bio')}
        />
        <div className={styles.buttons}>
          <div className={styles.buttonsLastStage}>
            <Button
              type="button"
              variant="secondary"
              onClick={stageSelectImage}
            >
              Go back
            </Button>
            <Button
              type="reset"
              variant="primary"
              onClick={onReset}
              disabled={!isDirty}
            >
              Reset
            </Button>
          </div>
          <Button
            type="submit"
            variant="primary"
            onClick={onClick}
            disabled={isError || !isDirty}
          >
            Save changes
          </Button>
          <ConfirmationDialog
            text="Save changes?"
            isVisible={isModalOpen}
            closeModal={closeModal}
          >
            <Button variant="primary" onClick={onSubmit}>
              Save
              <FloppyDisk />
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </ConfirmationDialog>
        </div>
      </motion.form>
    </>
  );
};
