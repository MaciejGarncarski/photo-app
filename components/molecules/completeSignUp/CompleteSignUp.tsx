import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './completeSignUp.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/molecules/input/Input';
import { useAccount } from '@/components/pages/account/useAccount';

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const fullName = z
  .string()
  .min(4, { message: 'Full name must contain at least 2 characters' });
export const username = z
  .string()
  .min(4, { message: 'Username must contain at least 4 characters' })
  .regex(usernameRegex, { message: 'Invalid username' });

const signUpSchema = z.object({
  username,
  fullName,
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export const CompleteSignUp = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const { data } = useAccount({ id: session?.user?.id });
  const queryCache = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors, defaultValues },
  } = useForm<SignUpSchema>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: data?.user.username ?? '',
      fullName: data?.user.name ?? '',
    },
  });

  console.log(errors);

  const onSubmit: SubmitHandler<SignUpSchema> = async ({ username, fullName }) => {
    const { status } = await axios.put('/api/account/completeSignUp', {
      data: {
        username,
        fullName,
        userID: session?.user?.id,
      },
    });

    if (status === 200) {
      queryCache.invalidateQueries();
      push('/');
    }
  };

  return (
    <div className={styles.dialog} role='dialog'>
      <h2 className={clsx('heading', styles.heading)}>Complete your sign up</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          labelText='Username'
          error={errors.username}
          isDirty={dirtyFields.username}
          {...register('username')}
        />
        <Input
          labelText='Full name'
          error={errors.fullName}
          isEmpty={defaultValues?.fullName?.trim() === ''}
          isDirty={dirtyFields.fullName}
          {...register('fullName')}
        />
        <div className={styles.buttons}>
          <Button type='button' variant='secondary' onClick={() => signOut()}>
            sign out
          </Button>
          <Button type='submit'>looks good</Button>
        </div>
      </form>
    </div>
  );
};
