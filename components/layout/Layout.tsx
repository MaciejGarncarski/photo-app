import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ReactNode, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import { Header } from '@/components/organisms/header/Header';

import styles from './layout.module.scss';

export type Children = {
  children: ReactNode;
};

type LayoutProps = Children & {
  className: string;
};

const CompleteSignUp = dynamic(
  () => import('@/components/molecules/completeSignUp/CompleteSignUp').then(({ CompleteSignUp }) => CompleteSignUp),
  { ssr: false },
);

const CookiesPopup = dynamic(
  () => import('@/components/molecules/cookiesPopup/CookiesPopup').then(({ CookiesPopup }) => CookiesPopup),
  { ssr: false },
);

export const Layout = ({ className, children }: LayoutProps) => {
  const [isCookiesOpen, setIsCookiesOpen] = useState<boolean>(true);

  const { session, isSignedIn } = useAuth();
  const { isLoading } = useUser({ userId: session?.user?.id });

  const handleClose = () => {
    setIsCookiesOpen(false);
  };

  return (
    <div className={className}>
      <Header />
      <div className={styles.children}>
        <AnimatePresence>{isCookiesOpen && <CookiesPopup onClose={handleClose} />}</AnimatePresence>
        {!isSignedIn && !isLoading ? <CompleteSignUp /> : <>{children}</>}
      </div>
    </div>
  );
};
