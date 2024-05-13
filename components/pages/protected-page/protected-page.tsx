'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';

import { useAuth } from '@/hooks/use-auth';

import { Loader } from '@/components/loader/loader';

type Props = {
  children: ReactElement;
  sessionNeeded: boolean;
};

export const ProtectedPage = ({ children, sessionNeeded }: Props) => {
  const router = useRouter();
  const { isSignedIn, isFetching, sessionUser } = useAuth();
  const path = usePathname();

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (isSignedIn && !sessionNeeded) {
      router.replace('/access-denied');
      return;
    }

    if (!isSignedIn && sessionNeeded) {
      router.replace(`/auth/sign-in`);
      return;
    }
  }, [isFetching, sessionNeeded, router, isSignedIn, path]);

  if (!sessionUser && isFetching) {
    return <Loader size="big" color="accent" marginTop />;
  }

  if ((isSignedIn && sessionNeeded) || (!isSignedIn && !sessionNeeded)) {
    return children;
  }

  return <Loader size="big" color="accent" marginTop />;
};
