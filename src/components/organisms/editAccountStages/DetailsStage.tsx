import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useUser } from '@/src/hooks/useUser';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { Input } from '@/src/components/atoms/input/Input';
import { TextArea } from '@/src/components/atoms/textArea/TextArea';
import { ConfirmationAlert } from '@/src/components/molecules/confirmationAlert/ConfirmationAlert';
import { EditAccountHeading } from '@/src/components/molecules/editAccountHeading/EditAccountHeading';
import { useModal } from '@/src/components/molecules/modal/useModal';
import { TextWithLoader } from '@/src/components/molecules/textWithLoader/TextWithLoader';
import { AccountDetails, AccountDetailsSchema } from '@/src/components/organisms/editAccountStages/accountDetailts';
import { stageVariant } from '@/src/components/organisms/editAccountStages/stage.animation';
import { useEditDetails } from '@/src/components/organisms/editAccountStages/useEditDetails';

import styles from './stages.module.scss';

type PropsTypes = {
  userId: string;
  stageSelectImage: () => void;
};

export const DetailsStage = ({ userId, stageSelectImage }: PropsTypes) => {
  const { username, name, bio, isLoading } = useUser({ userId });
  const formRef = useRef<HTMLFormElement>(null);
  const { close, modalOpen, open } = useModal();

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

  const { onReset, onClick, onSubmit, editAccountLoading } = useEditDetails({ getValues, open, reset, userId });

  const isError = Boolean(errors.bio || errors.fullName || errors.username);

  const closeConfirmation = () => {
    close();
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
            isVisible={modalOpen}
            headingText="Save changes?"
            close={closeConfirmation}
            onConfirm={onSubmit}
          />
        </div>
      </motion.form>
    </>
  );
};
