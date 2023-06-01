import { motion } from 'framer-motion';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { Input } from '@/src/components/atoms/input/Input';
import { TextArea } from '@/src/components/atoms/textArea/TextArea';

import { EditAccountHeading } from '@/src/components/molecules/editAccountHeading/EditAccountHeading';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { useDetailsStage } from '@/src/components/organisms/editAccountStages/detailsStage/useDetailsStage';
import { stageVariant } from '@/src/components/organisms/editAccountStages/stage.animation';
import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import styles from '../Stages.module.scss';

type PropsTypes = {
  userId: string;
  stageSelectImage: () => void;
};

export const DetailsStage = ({ userId, stageSelectImage }: PropsTypes) => {
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
    return <TextWithLoader text="Saving changes" />;
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
          error={errors.username?.message}
          {...register('username')}
        />
        <Input
          type="text"
          labelText="Full name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <TextArea
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
            headingText="Save changes?"
            isVisible={isModalOpen}
            closeModal={closeModal}
            onConfirm={onSubmit}
          />
        </div>
      </motion.form>
    </>
  );
};
