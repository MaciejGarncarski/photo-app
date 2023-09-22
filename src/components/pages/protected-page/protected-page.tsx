'use client';

import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { Loader } from '@/src/components/loader/loader';

type Props = {
  children: ReactElement;
  signedIn: boolean;
};

export const ProtectedPage = ({ children, signedIn }: Props) => {
  const router = useRouter();
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loader color="accent" size="big" marginTop />;
  }

  if (isSignedIn && !signedIn) {
    router.push('/access-denied');
    return null;
  }

  if (!isSignedIn && signedIn) {
    router.push('/access-denied');
    return null;
  }

  return children;
};
