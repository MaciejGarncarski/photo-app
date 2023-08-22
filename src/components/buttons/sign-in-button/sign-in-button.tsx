import { IconLogin } from '@tabler/icons-react';

import { ButtonLink } from '@/src/components/buttons/button-link/button-link';

export const SignInButton = () => {
  return (
    <ButtonLink href="/auth/signin">
      <IconLogin />
      Sign in
    </ButtonLink>
  );
};
