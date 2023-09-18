import { SignIn } from '@phosphor-icons/react';

import { ButtonLink } from '@/src/components/buttons/button-link/button-link';

export const SignInButton = () => {
  return (
    <ButtonLink href="/auth/signin">
      <SignIn />
      Sign in
    </ButtonLink>
  );
};
