import { zodResolver } from '@hookform/resolvers/zod';
import { motion as m } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/buttons/button/Button';
import { EditAccountHeading } from '@/components/atoms/editAccountHeading/EditAccountHeading';
import { Input } from '@/components/atoms/input/Input';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { TextWithLoader } from '@/components/atoms/textWithLoader/TextWithLoader';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { stageVariant } from '@/components/organisms/editAccountStages/SelectOptionStage';
import { useEditDetails } from '@/components/organisms/editAccountStages/useEditDetails';

import styles from './stages.module.scss';

type PropsTypes = {
  userId: string;
  stageSelectImage: () => void;
};

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
const smallCharactersRegexp = /^[a-z0-9_\-]+$/;

export const fullName = z.string().min(4, { message: 'Full name must contain at least 2 characters' }).optional();
export const username = z
  .string()
  .min(4, { message: 'Username must contain at least 4 characters' })
  .regex(usernameRegex, { message: 'Invalid username' })
  .regex(smallCharactersRegexp, { message: 'Only lowercase characters allowed' })
  .max(9, { message: 'Only 9 characters allowed' })
  .optional();

export const bio = z.string().max(200, { message: 'Bio contains too many characters' }).optional();

export const AccountDetailsSchema = z.object({
  username,
  fullName,
  bio,
});

export type AccountDetails = z.infer<typeof AccountDetailsSchema>;

export const DetailsStage = ({ userId, stageSelectImage }: PropsTypes) => {
  const { username, name, bio, isLoading } = useUser({ userId });
  const formRef = useRef<HTMLFormElement>(null);
  const { close, modalOpen, open } = useModal();

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

  const { onReset, onClick, onSubmit, editAccountLoading } = useEditDetails({ getValues, open, reset, userId });

  const isError = Boolean(errors.bio || errors.fullName || errors.username);

  if (isLoading) {
    return null;
  }

  if (editAccountLoading) {
    return <TextWithLoader text="Saving changes" />;
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
