import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { Loader } from '@/src/components/loader/loader';

type Props = {
  children: ReactElement;
  shouldBeSignedIn: boolean;
};

export const ProtectedPage = ({ children, shouldBeSignedIn = true }: Props) => {
  const router = useRouter();
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loader color="blue" size="normal" marginTop />;
  }

  if (isSignedIn && !shouldBeSignedIn) {
    router.push('/access-denied');
    return null;
  }

  if (!isSignedIn && shouldBeSignedIn) {
    router.push('/access-denied');
    return null;
  }

  return children;
};
