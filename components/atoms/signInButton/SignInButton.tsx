import { useRouter } from 'next/router';

import { Button } from '@/components/atoms/button/Button';

export const SIGN_IN_PATHNAME = '/auth/signin';

export const SignInButton = () => {
  const { push, pathname } = useRouter();
  return (
    <Button disabled={pathname === SIGN_IN_PATHNAME} onClick={() => push('/auth/signin')}>
      Sign in
    </Button>
  );
};
