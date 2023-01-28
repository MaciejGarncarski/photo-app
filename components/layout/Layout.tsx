import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';

import { Header } from '@/components/organisms/header/Header';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

import styles from './layout.module.scss';

export type Children = {
  children: ReactNode;
};

type LayoutProps = Children & {
  className: string;
};

const COOKIES_ACCEPTED = 'cookiesAccepted' as const;

const CompleteSignUp = dynamic(
  () => import('@/components/molecules/completeSignUp/CompleteSignUp').then(({ CompleteSignUp }) => CompleteSignUp),
  { ssr: false },
);

const CookieAlert = dynamic(
  () => import('@/components/molecules/cookieAlert/CookieAlert').then(({ CookieAlert }) => CookieAlert),
  { ssr: false },
);

export const Layout = ({ className, children }: LayoutProps) => {
  const [localStorageData, setLocalStorageData] = useState<string | null>(null);
  const [isCookiesOpen, setIsCookiesOpen] = useState<boolean>(false);

  useEffect(() => {
    setLocalStorageData(localStorage.getItem(COOKIES_ACCEPTED));
    setIsCookiesOpen(localStorageData !== 'true');
  }, [localStorageData]);

  const { session, status } = useAuth();
  const { data, isLoading } = useAccount({ userId: session?.user?.id });
  const isNotCompleted = !data?.user?.username && status === 'authenticated';

  const handleClose = () => {
    setIsCookiesOpen(false);
  };

  const handleCookies = () => {
    window.localStorage.setItem(COOKIES_ACCEPTED, 'true');
    handleClose();
  };

  return (
    <div className={className}>
      <Header />
      <div className={styles.children}>
        <AnimatePresence>
          {isCookiesOpen && !localStorageData && <CookieAlert onClose={handleClose} onPermanentClose={handleCookies} />}
        </AnimatePresence>
        {isNotCompleted && !isLoading ? <CompleteSignUp /> : <>{children}</>}
      </div>
    </div>
  );
};
