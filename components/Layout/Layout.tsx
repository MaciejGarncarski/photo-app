import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import styles from './layout.module.scss';

import { CompleteSignUp } from '@/components/molecules/completeSignUp/CompleteSignUp';
import { Header } from '@/components/organisms/header/Header';
import { useAccount } from '@/components/pages/account/useAccount';

export type Children = {
  children: ReactNode;
};

export const Layout = ({ children }: Children) => {
  const { data: session, status } = useSession();
  const { data, isLoading } = useAccount({ id: session?.user?.id });

  if (isLoading || !data) {
    return (
      <div>
        <Header />
      </div>
    );
  }

  if (!data?.user.username && status === 'authenticated') {
    return (
      <div>
        <Header />
        <div className={styles.children}>
          <CompleteSignUp />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.children}>{children}</div>
    </div>
  );
};
