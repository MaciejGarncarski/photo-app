import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './completeSignUp.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Input } from '@/components/molecules/input/Input';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const fullName = z
  .string()
  .min(4, { message: 'Full name must contain at least 2 characters' });
export const username = z
  .string()
  .min(4, { message: 'Username must contain at least 4 characters' })
  .regex(usernameRegex, { message: 'Invalid username' });

const bio = z.string();

const signUpSchema = z.object({
  username,
  fullName,
  bio,
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export const CompleteSignUp = () => {
  const { push } = useRouter();
  const { session, signOut } = useAuth();
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
      bio: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async ({ username, fullName, bio }) => {
    const { status } = await axios.put('/api/account/completeSignUp', {
      data: {
        username,
        fullName,
        bio,
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
      <Heading tag='h2' className={styles.heading}>
        Complete your sign up
      </Heading>
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
        <Input
          labelText='Bio'
          error={errors.bio}
          isEmpty={defaultValues?.bio?.trim() === ''}
          isDirty={dirtyFields.bio}
          optional
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
