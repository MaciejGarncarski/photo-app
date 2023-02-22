import { ReactNode, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import styles from './layout.module.scss';

import { Header } from '../organisms/header/Header';

export type Children = {
  children: ReactNode;
};

type PropsTypes = Children;

export const Layout = ({ children }: PropsTypes) => {
  const [isCookiesOpen, setIsCookiesOpen] = useState<boolean>(true);

  const { session, isSignedIn } = useAuth();
  const { isLoading } = useUser({ userId: session?.user?.id });

  const handleClose = () => {
    setIsCookiesOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Header />
      {/* {!isSignedIn && !isLoading ? <CompleteSignUp /> : <>{children}</>} */}
      {children}
      {/* <AnimatePresence>{isCookiesOpen && <CookiesPopup onClose={handleClose} />}</AnimatePresence> */}
    </div>
  );
};
