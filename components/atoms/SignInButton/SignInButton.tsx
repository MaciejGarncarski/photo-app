import { useRouter } from 'next/router';

import { Button } from '@/components/atoms/button/Button';

export const SignInButton = () => {
  const { push } = useRouter();

  return <Button onClick={() => push('/auth/signin')}>Sign in</Button>;
};
