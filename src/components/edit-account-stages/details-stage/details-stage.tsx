import { motion } from 'framer-motion';

import { Button } from '@/src/components/buttons/button/button';
import { EditAccountHeading } from '@/src/components/edit-account-heading/edit-account-heading';
import { useDetailsStage } from '@/src/components/edit-account-stages/details-stage/use-details-stage';
import { stageVariant } from '@/src/components/edit-account-stages/stage.animation';
import { Input } from '@/src/components/input/input';
import { ConfirmationAlert } from '@/src/components/modals/confirmation-alert/confirmation-alert';
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
    getValues,
    onClick,
    onReset,
    onSubmit,
    register,
  } = useDetailsStage({ userId });

  if (isLoading) {
    return null;
  }

  if (editAccountLoading) {
    return null;
    // TODO
  }

  return (
    <>
      <EditAccountHeading text="Edit account details" />
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
          isEmpty={getValues('username') === ''}
          error={errors.username?.message}
          {...register('username')}
        />
        <Input
          type="text"
          labelText="Full name"
          placeholder="Full name"
          isEmpty={getValues('fullName') === ''}
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <TextArea
          isEmpty={getValues('bio') === ''}
          error={errors.bio?.message}
          label="bio"
          {...register('bio')}
        />
        <div className={styles.buttons}>
          <div className={styles.buttonsLastStage}>
            <Button
              type="button"
              variant="secondary"
              onClick={stageSelectImage}
            >
              go back
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
          <ConfirmationAlert
            text="Save changes?"
            isVisible={isModalOpen}
            closeModal={closeModal}
            onConfirm={onSubmit}
          />
        </div>
      </motion.form>
    </>
  );
};
