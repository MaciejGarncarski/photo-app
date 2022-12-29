import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';

import { namedComponent } from '@/utils/namedComponent';

import styles from './layout.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Header } from '@/components/organisms/header/Header';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { useScrollPosition } from '@/components/organisms/header/useScrollPosition';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

export type Children = {
  children: ReactNode;
};

type LayoutProps = Children;

const COOKIES_ACCEPTED = 'cookiesAccepted' as const;
const COOKIE_CONSTENST =
  'By using this app, you accept saving and reading necessary cookies to run this app by your browser.';

const CompleteSignUp = dynamic(() =>
  namedComponent(import('@/components/molecules/completeSignUp/CompleteSignUp'), 'CompleteSignUp')
);

export const Layout = ({ children }: LayoutProps) => {
  const [localStorageData, setLocalStorageData] = useState<string | null>(null);
  const [isCookiesOpen, setIsCookiesOpen] = useState<boolean>(false);

  useEffect(() => {
    setLocalStorageData(localStorage.getItem(COOKIES_ACCEPTED));
    setIsCookiesOpen(localStorageData !== 'true');
  }, [localStorageData]);

  useScrollPosition();
  useScreenWidth();

  const { session, status } = useAuth();
  const { data, isLoading } = useAccount({ id: session?.user?.id });
  const isNotCompleted = !data?.user.username && status === 'authenticated';

  const handleClose = () => {
    setIsCookiesOpen(false);
  };

  const handleCookies = () => {
    window.localStorage.setItem(COOKIES_ACCEPTED, 'true');
    handleClose();
  };

  return (
    <div>
      <Header />
      <div className={styles.children}>
        {isCookiesOpen && (
          <div role='dialog' className={styles.cookies}>
            <p>{COOKIE_CONSTENST}</p>
            <div className={styles.cookiesButtons}>
              <Button type='button' variant='secondary' onClick={handleCookies}>
                Don&apos;t show again
              </Button>
              <Button type='button' onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        )}
        {isNotCompleted && !isLoading ? <CompleteSignUp /> : <>{children}</>}
      </div>
    </div>
  );
};
