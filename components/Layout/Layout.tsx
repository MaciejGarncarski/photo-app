import { hasCookie, setCookie } from 'cookies-next';
import { ReactNode, useState } from 'react';

import styles from './layout.module.scss';

import { Button } from '@/components/atoms/button/Button';
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

export const Layout = ({ children }: LayoutProps) => {
  const isCookieAccepted = hasCookie(COOKIES_ACCEPTED);
  const [isCookiesOpen, setIsCookiesOpen] = useState<boolean>(!isCookieAccepted);

  useScrollPosition();
  useScreenWidth();

  const { session, status } = useAuth();
  const { data } = useAccount({ id: session?.user?.id });

  const isNotCompleted = !data?.user.username && status === 'authenticated';

  const handleClose = () => {
    setIsCookiesOpen(false);
  };

  const handleCookies = () => {
    setCookie(COOKIES_ACCEPTED, true);
    handleClose();
  };

  return (
    <div>
      <Header />
      <div className={styles.children}>
        {isCookiesOpen && (
          <div role='dialog' className={styles.cookies}>
            <p>By using this app, you accept necessary cookies.</p>
            <div className={styles.cookiesButtons}>
              <Button type='button' variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button type='button' onClick={handleCookies}>
                Don&apos;t show again
              </Button>
            </div>
          </div>
        )}
        {isNotCompleted ? <CompleteSignUp /> : <>{children}</>}
      </div>
    </div>
  );
};
