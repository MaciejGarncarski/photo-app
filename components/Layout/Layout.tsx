import { ReactNode, useState } from 'react';

import styles from './layout.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { CompleteSignUp } from '@/components/molecules/completeSignUp/CompleteSignUp';
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

const cookieConstenst =
  'By using this app, you accept saving and reading necessary cookies by your browser.';

export const Layout = ({ children }: LayoutProps) => {
  const localStorageData =
    typeof window !== 'undefined' ? localStorage.getItem(COOKIES_ACCEPTED) : false;

  const isCookieAccepted = localStorageData === 'true';
  const [isCookiesOpen, setIsCookiesOpen] = useState<boolean>(!isCookieAccepted);

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

  if (!data) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.full}>
        <Heading tag='h1'>Loading PhotoApp</Heading>
        <Loading variants={['center']} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.children}>
        {isCookiesOpen && (
          <div role='dialog' className={styles.cookies}>
            <p>{cookieConstenst}</p>
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
        {isNotCompleted ? <CompleteSignUp /> : <>{children}</>}
      </div>
    </div>
  );
};
