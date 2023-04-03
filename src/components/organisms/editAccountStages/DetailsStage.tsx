import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useModal } from '@/src/hooks/useModal';
import { useUser } from '@/src/hooks/useUser';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { Input } from '@/src/components/atoms/input/Input';
import { TextArea } from '@/src/components/atoms/textArea/TextArea';

import { EditAccountHeading } from '@/src/components/molecules/editAccountHeading/EditAccountHeading';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import {
  AccountDetails,
  AccountDetailsSchema,
} from '@/src/components/organisms/editAccountStages/accountDetailtsValidation';
import { stageVariant } from '@/src/components/organisms/editAccountStages/stage.animation';
import { useEditDetails } from '@/src/components/organisms/editAccountStages/useEditDetails';
import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import styles from './stages.module.scss';

type PropsTypes = {
  userId: string;
  stageSelectImage: () => void;
};

export const DetailsStage = ({ userId, stageSelectImage }: PropsTypes) => {
  const { username, name, bio, isLoading } = useUser({ userId });
  const formRef = useRef<HTMLFormElement>(null);
  const { closeModal, isModalOpen, openModal } = useModal();

  const {
    register,
    reset,
    getValues,
    formState: { isDirty, errors },
  } = useForm<AccountDetails>({
    defaultValues: {
      username: username || '',
      fullName: name || '',
      bio: bio || '',
    },
    mode: 'all',
    resolver: zodResolver(AccountDetailsSchema),
  });

  const { onReset, onClick, onSubmit, editAccountLoading } = useEditDetails({ getValues, openModal, reset, userId });

  const isError = Boolean(errors.bio || errors.fullName || errors.username);

  const closeConfirmation = () => {
    closeModal();
  };

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
        <Input type="text" labelText="Username" error={errors.username?.message} {...register('username')} />
        <Input type="text" labelText="Full name" error={errors.fullName?.message} {...register('fullName')} />
        <TextArea error={errors.bio?.message} label="bio" {...register('bio')} />
        <div className={styles.buttons}>
          <div className={styles.buttonsLastStage}>
            <Button type="button" variant="secondary" onClick={stageSelectImage}>
              go back
            </Button>
            <Button type="reset" variant="primary" onClick={onReset} disabled={!isDirty}>
              Reset
            </Button>
          </div>
          <Button type="submit" variant="primary" onClick={onClick} disabled={isError || !isDirty}>
            Save changes
          </Button>
          <ConfirmationAlert
            isVisible={isModalOpen}
            headingText="Save changes?"
            closeModal={closeConfirmation}
            onConfirm={onSubmit}
          />
        </div>
      </motion.form>
    </>
  );
};
