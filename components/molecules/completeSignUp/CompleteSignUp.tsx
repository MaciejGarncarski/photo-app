import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Input } from '@/components/molecules/input/Input';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useUser } from '@/components/pages/account/useUser';

import styles from './completeSignUp.module.scss';

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

export const SignUpSchema = AccountDetailsSchema.extend({
  userId: z.string(),
});

export type SignUpSchemaData = z.infer<typeof SignUpSchema>;

export const CompleteSignUp = () => {
  const { push } = useRouter();
  const { session, signOut } = useAuth();
  const { username, bio, name } = useUser({ userId: session?.user?.id });
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountDetails>({
    mode: 'onBlur',
    resolver: zodResolver(AccountDetailsSchema),
    defaultValues: {
      username: username ?? '',
      fullName: name ?? '',
      bio: bio ?? '',
    },
  });

  const onSubmit: SubmitHandler<AccountDetails> = async ({ username, fullName, bio }) => {
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
        <Input labelText="Username" error={errors.username} {...register('username')} />
        <Input labelText="Full name" error={errors.fullName} {...register('fullName')} />
        <Input labelText="Bio" error={errors.bio} optional {...register('bio')} />
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
