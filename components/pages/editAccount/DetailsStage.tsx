import { zodResolver } from '@hookform/resolvers/zod';
import { motion as m } from 'framer-motion';
import { useRouter } from 'next/router';
import { MouseEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/button/Button';
import { EditAccountHeading } from '@/components/atoms/editAccountHeading/EditAccountHeading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { AccountDetails, AccountDetailsSchema } from '@/components/molecules/completeSignUp/CompleteSignUp';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { Input } from '@/components/molecules/input/Input';
import { stageVariant } from '@/components/pages/editAccount/SelectOptionStage';
import { useEditAccount } from '@/components/pages/editAccount/useEditAccount';

import styles from './editAccount.module.scss';

type PropsTypes = {
  userId: string;
  stageSelectImage: () => void;
};

export const DetailsStage = ({ userId, stageSelectImage }: PropsTypes) => {
  const { username, name, bio, isLoading } = useUser({ userId });
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { close, modalOpen, open } = useModal();

  const editAccount = useEditAccount();

  const defaultValues = {
    username: username ?? '',
    fullName: name ?? '',
    bio: bio ?? '',
  };

  const {
    register,
    reset,
    getValues,
    formState: { isDirty, errors },
  } = useForm<AccountDetails>({
    mode: 'all',
    resolver: zodResolver(AccountDetailsSchema),
    defaultValues,
  });

  const onReset = (clickEv: MouseEvent<HTMLButtonElement>) => {
    clickEv.preventDefault();
    reset();
  };

  const onClick = (clickEv: MouseEvent<HTMLButtonElement>) => {
    clickEv.preventDefault();
    open();
  };

  const onSubmit = async () => {
    const { bio, fullName, username } = getValues();

    await editAccount.mutateAsync(
      { bio, fullName, userId, username },
      {
        onSuccess: () => {
          router.push(`/${username}`);
        },
      },
    );
  };

  const isError = Boolean(errors.bio || errors.fullName || errors.username);

  if (isLoading) {
    return null;
  }

  if (editAccount.isLoading) {
    return (
      <m.section variants={stageVariant} animate="animate" exit="exit" initial="initial">
        <EditAccountHeading text="Saving changes" />
      </m.section>
    );
  }

  return (
    <>
      <EditAccountHeading text="Edit account details" />
      <m.form
        variants={stageVariant}
        animate="animate"
        exit="exit"
        initial="initial"
        className={styles.form}
        ref={formRef}
      >
        <Input type="text" labelText="Username" error={errors.username} {...register('username')} />
        <Input type="text" labelText="Full name" error={errors.fullName} {...register('fullName')} />
        <TextArea error={errors.bio} label="bio" {...register('bio')} />
        <div className={styles.buttons}>
          <div className={styles.buttonsLastStage}>
            <Button type="button" variant="secondary" onClick={stageSelectImage}>
              go back
            </Button>
            <Button type="reset" disabled={!isDirty} onClick={onReset}>
              Reset
            </Button>
          </div>
          <Button type="submit" onClick={onClick} disabled={isError}>
            Save changes
          </Button>

          <ModalContainer>
            {modalOpen && <ConfirmationAlert headingText="Save changes?" close={close} onConfirm={onSubmit} />}
          </ModalContainer>
        </div>
      </m.form>
    </>
  );
};
