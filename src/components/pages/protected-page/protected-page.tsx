'use client';

import { useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { Loader } from '@/src/components/loader/loader';

type Props = {
  children: ReactElement;
  sessionNeeded: boolean;
};

export const ProtectedPage = ({ children, sessionNeeded }: Props) => {
  const router = useRouter();
  const { isSignedIn, isFetching, sessionUser } = useAuth();

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (isSignedIn && !sessionNeeded) {
      router.replace('/access-denied');
      return;
    }

    if (!isSignedIn && sessionNeeded) {
      router.replace('/auth/sign-in');
      return;
    }
  }, [isFetching, sessionNeeded, router, isSignedIn]);

  if (!sessionUser && isFetching) {
    return <Loader size="big" color="accent" />;
  }

  if ((isSignedIn && sessionNeeded) || (!isSignedIn && !sessionNeeded)) {
    return children;
  }

  return <Loader size="big" color="accent" />;
};
