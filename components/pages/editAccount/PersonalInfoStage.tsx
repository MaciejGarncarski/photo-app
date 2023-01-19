import { zodResolver } from '@hookform/resolvers/zod';
import { motion as m } from 'framer-motion';
import { useRouter } from 'next/router';
import { MouseEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './editAccount.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { AccountPersonalInfo, AccountPersonalInfoSchema } from '@/components/molecules/completeSignUp/CompleteSignUp';
import { ConfirmationModal } from '@/components/molecules/confirmationModal/ConfirmationModal';
import { Input } from '@/components/molecules/input/Input';
import { useAccount } from '@/components/pages/account/useAccount';
import { stageVariant } from '@/components/pages/editAccount/SelectImageStage';
import { useEditAccount } from '@/components/pages/editAccount/useEditAccount';

type PropsTypes = {
  finalImg: Blob | null;
  stageSelectImage: () => void;
  userId: string;
};

export const PersonalInfoStage = ({ finalImg, userId, stageSelectImage }: PropsTypes) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { data, isLoading } = useAccount({ userId });
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate, isLoading: isMutationLoading } = useEditAccount();

  const defaultValues = {
    username: data?.user?.username ?? '',
    fullName: data?.user?.name ?? '',
    bio: data?.user?.bio ?? '',
  };

  const {
    register,
    reset,
    getValues,
    formState: { isDirty, errors },
  } = useForm<AccountPersonalInfo>({
    mode: 'all',
    resolver: zodResolver(AccountPersonalInfoSchema),
    defaultValues,
  });

  const onReset = (clickEv: MouseEvent<HTMLButtonElement>) => {
    clickEv.preventDefault();
    reset();
  };

  const onClick = (clickEv: MouseEvent<HTMLButtonElement>) => {
    clickEv.preventDefault();
    setIsUpdating(true);
  };

  const onSubmit = () => {
    const { bio, fullName, username } = getValues();

    mutate(
      { bio, fullName, image: finalImg, userId, username },
      {
        onSuccess: () => {
          router.push(`/${username}`);
        },
      },
    );
  };

  const isError = Boolean(errors.bio || errors.fullName || errors.username);

  if (isLoading) {
    return <Loading />;
  }

  if (isMutationLoading) {
    return (
      <m.section variants={stageVariant} animate="animate" exit="exit" initial="initial">
        <Heading tag="h2">Saving changes...</Heading>
        <Loading />
      </m.section>
    );
  }

  return (
    <>
      <Heading tag="h2">2. Edit personal information</Heading>
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
              back
            </Button>
            <Button type="reset" disabled={!isDirty} onClick={onReset}>
              Reset
            </Button>
          </div>
          <Button type="submit" onClick={onClick} disabled={!finalImg || isError}>
            Save changes
          </Button>

          {isUpdating && !isError && (
            <ConfirmationModal
              confirmText="Save changes"
              variant="positive"
              setIsOpen={setIsUpdating}
              onCancel={() => setIsUpdating(false)}
              onConfirm={onSubmit}
            />
          )}
        </div>
      </m.form>
    </>
  );
};
