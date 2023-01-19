import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './completeSignUp.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Input } from '@/components/molecules/input/Input';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const fullName = z.string().min(4, { message: 'Full name must contain at least 2 characters' });
export const username = z
  .string()
  .min(4, { message: 'Username must contain at least 4 characters' })
  .regex(usernameRegex, { message: 'Invalid username' });

export const bio = z.string();

export const AccountPersonalInfoSchema = z.object({
  username,
  fullName,
  bio,
});

export type AccountPersonalInfo = z.infer<typeof AccountPersonalInfoSchema>;

export const SignUpSchema = AccountPersonalInfoSchema.extend({
  userId: z.string(),
});

export type SignUpSchemaData = z.infer<typeof SignUpSchema>;

export const CompleteSignUp = () => {
  const { push } = useRouter();
  const { session, signOut } = useAuth();
  const { data } = useAccount({ userId: session?.user?.id });
  const queryClient = useQueryClient();

  const userData = data?.user;

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors, defaultValues },
  } = useForm<AccountPersonalInfo>({
    mode: 'onBlur',
    resolver: zodResolver(AccountPersonalInfoSchema),
    defaultValues: {
      username: userData?.username ?? '',
      fullName: userData?.name ?? '',
      bio: userData?.bio ?? '',
    },
  });

  const onSubmit: SubmitHandler<AccountPersonalInfo> = async ({ username, fullName, bio }) => {
    if (!session?.user?.id) {
      return;
    }
    await axios.put<unknown, null, SignUpSchemaData>('/api/account/completeSignUp', {
      username,
      fullName,
      bio,
      userId: session?.user?.id,
    });

    queryClient.invalidateQueries();
    push('/');
  };

  return (
    <div className={styles.dialog} role="dialog">
      <NextSeo title="Complete sign up" />
      <Heading tag="h2" className={styles.heading}>
        Complete your sign up
      </Heading>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input labelText="Username" error={errors.username} isDirty={dirtyFields.username} {...register('username')} />
        <Input
          labelText="Full name"
          error={errors.fullName}
          isEmpty={defaultValues?.fullName?.trim() === ''}
          isDirty={dirtyFields.fullName}
          {...register('fullName')}
        />
        <Input
          labelText="Bio"
          error={errors.bio}
          isEmpty={defaultValues?.bio?.trim() === ''}
          isDirty={dirtyFields.bio}
          optional
          {...register('bio')}
        />
        <div className={styles.buttons}>
          <Button type="button" variant="secondary" onClick={() => signOut()}>
            sign out
          </Button>
          <Button type="submit">looks good</Button>
        </div>
      </form>
    </div>
  );
};
