import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';

import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/buttons/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { TextWithLoader } from '@/components/atoms/textWithLoader/TextWithLoader';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { EditAccountHeading } from '@/components/molecules/editAccountHeading/EditAccountHeading';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { AccountDetails, AccountDetailsSchema } from '@/components/organisms/editAccountStages/accountDetailts';
import { stageVariant } from '@/components/organisms/editAccountStages/SelectOptionStage';
import { useEditDetails } from '@/components/organisms/editAccountStages/useEditDetails';

import styles from './stages.module.scss';

type PropsTypes = {
  userId: string;
  stageSelectImage: () => void;
};

export const DetailsStage = ({ userId, stageSelectImage }: PropsTypes) => {
  const { username, name, bio, isLoading } = useUser({ userId });
  const formRef = useRef<HTMLFormElement>(null);
  const { close, modalOpen, open } = useModal();

  const formOptions: UseFormProps = {
    defaultValues: {
      username: username ?? '',
      fullName: name ?? '',
      bio: bio ?? '',
    },
    mode: 'all',
    resolver: zodResolver(AccountDetailsSchema),
  };

  const {
    register,
    reset,
    getValues,
    formState: { isDirty, errors },
  } = useForm<AccountDetails>(formOptions);

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
          <ModalContainer>
            {modalOpen && (
              <ConfirmationAlert headingText="Save changes?" close={closeConfirmation} onConfirm={onSubmit} />
            )}
          </ModalContainer>
        </div>
      </motion.form>
    </>
  );
};
