import { signIn } from 'next-auth/react';
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react';

import styles from './signInButton.module.scss';

export const SignInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (mouseEv: MouseEvent) => {
    if (mouseEv.target === overlayRef.current) {
      setIsModalOpen(false);
    }
  };

  const handleEscapeKey = (keyEv: KeyboardEvent) => {
    if (isModalOpen && keyEv.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        type='button'
        onKeyDown={handleEscapeKey}
        className={styles.button}
        onClick={() => setIsModalOpen(true)}
      >
        Sign in
      </button>
      {isModalOpen && (
        <div ref={overlayRef} onClick={handleOverlayClick} className={styles.overlay}>
          <div role='dialog' className={styles.dialog}>
            <h2>Sign in</h2>
            <button onClick={() => signIn('google')}>google</button>
          </div>
        </div>
      )}
    </>
  );
};
