import { zodResolver } from '@hookform/resolvers/zod';
import { NextSeo } from 'next-seo';
import { MouseEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './editAccount.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { AccountPersonalInfo, AccountPersonalInfoSchema } from '@/components/molecules/completeSignUp/CompleteSignUp';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { Input } from '@/components/molecules/input/Input';
import { useAccount } from '@/components/pages/account/useAccount';
import { useEditAccount } from '@/components/pages/editAccount/useEditAccount';

type PropsTypes = {
  userId: string;
};

export const EditAccount = ({ userId }: PropsTypes) => {
  const { data, isLoading } = useAccount({ userId });

  const [finalImg, setFinalImg] = useState<Blob | null>(null);

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

  if (isLoading) {
    return <Loading />;
  }

  const onReset = (clickEv: MouseEvent<HTMLButtonElement>) => {
    clickEv.preventDefault();
    reset();
  };

  const onSubmit: SubmitHandler<AccountPersonalInfo> = ({ bio, fullName, username }) => {
    mutate({ bio, fullName, image: finalImg, userId, username });
  };

  // if (isMutationLoading) {
  //   return <p>updating</p>;
  // }

  return (
    <main id="main" className={styles.container}>
      <NextSeo title={`${data?.user.username} - Edit account`} />

      <div>
        <CropImage setFinalImg={setFinalImg} aspectRatio={1} />
        <Button type="button" variant="secondary">
          remove avatar
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Heading tag="h2">Edit personal information</Heading>
        <Input type="text" labelText="Username" error={errors.username} {...register('username')} />
        <Input type="text" labelText="Full name" {...register('fullName')} />
        <Input type="textarea" labelText="Bio" {...register('bio')} />
        <div className={styles.buttons}>
          <Button type="reset" disabled={!isDirty} onClick={onReset} variant="secondary">
            Reset
          </Button>
          <Button type="submit" disabled={false}>
            Update account
          </Button>
        </div>
      </form>
    </main>
  );
};
