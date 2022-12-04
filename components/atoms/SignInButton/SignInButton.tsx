import { signIn } from 'next-auth/react';
import { useState } from 'react';

import styles from './signInButton.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { ModalOvelay } from '@/components/atoms/modalOverlay/ModalOverlay';

export const SignInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Sign in</Button>
      {isModalOpen && (
        <ModalOvelay setOpen={setIsModalOpen}>
          <div role='dialog' className={styles.dialog}>
            <h2>Sign in</h2>
            <button onClick={() => signIn('google')}>google</button>
          </div>
        </ModalOvelay>
      )}
    </>
  );
};
