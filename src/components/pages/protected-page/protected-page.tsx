'use client';

import { useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

type Props = {
  children: ReactElement;
  signedIn: boolean;
};

export const ProtectedPage = ({ children, signedIn }: Props) => {
  const router = useRouter();
  const { isSignedIn, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isSignedIn && !signedIn) {
      router.push('/access-denied');
      return;
    }

    if (!isSignedIn && signedIn) {
      router.push('/access-denied');
      return;
    }
  }, [isLoading, isSignedIn, router, signedIn]);

  if (isLoading) {
    return null;
  }

  if (isSignedIn && !signedIn) {
    return null;
  }

  if (!isSignedIn && signedIn) {
    return null;
  }

  return children;
};
