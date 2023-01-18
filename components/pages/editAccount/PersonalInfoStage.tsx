import { zodResolver } from '@hookform/resolvers/zod';
import { motion as m } from 'framer-motion';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './editAccount.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
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

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields, errors, defaultValues },
  } = useForm<AccountPersonalInfo>({
    mode: 'onBlur',
    resolver: zodResolver(AccountPersonalInfoSchema),
    defaultValues: {
      username: data?.user.username ?? '',
      fullName: data?.user.name ?? '',
      bio: data?.user.bio ?? '',
    },
  });

  const { mutate, isLoading: isMutationLoading } = useEditAccount();

  const onReset = (clickEv: MouseEvent<HTMLButtonElement>) => {
    clickEv.preventDefault();
    reset();
  };

  const onSubmit: SubmitHandler<AccountPersonalInfo> = ({ bio, fullName, username }) => {
    mutate(
      { bio, fullName, image: finalImg, userId, username },
      {
        onSuccess: () => {
          router.push(`/${username}`);
        },
      },
    );
  };

  const onClick = (clickEv: MouseEvent<HTMLButtonElement>) => {
    clickEv.preventDefault();
    setIsUpdating(true);
  };

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
    <m.form
      variants={stageVariant}
      animate="animate"
      exit="exit"
      initial="initial"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <Heading tag="h2">2. Edit personal information</Heading>
      <Input type="text" labelText="Username" error={errors.username} {...register('username')} />
      <Input type="text" labelText="Full name" error={errors.fullName} {...register('fullName')} />
      <Input type="textarea" labelText="Bio" error={errors.bio} {...register('bio')} />
      <div className={styles.buttons}>
        <div className={styles.buttonsLastStage}>
          <Button type="button" variant="secondary" onClick={stageSelectImage}>
            back
          </Button>
          <Button type="reset" disabled={!isDirty} onClick={onReset} variant="secondary">
            Reset
          </Button>
        </div>
        <Button type="submit" onClick={onClick} disabled={false}>
          Save changes
        </Button>

        {isUpdating && (
          <ConfirmationModal
            confirmText="Save changes"
            variant="positive"
            setIsOpen={setIsUpdating}
            onCancel={() => setIsUpdating(false)}
            onConfirm={handleSubmit(onSubmit)}
          />
        )}
      </div>
    </m.form>
  );
};
