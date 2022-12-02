import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import styles from './layout.module.scss';

import { Header } from '@/components/organisms/header/Header';
import { useAccount } from '@/components/pages/account/useAccount';

export type Children = {
  children: ReactNode;
};

export const Layout = ({ children }: Children) => {
  const { data: session, status } = useSession();
  const { data } = useAccount({ id: session?.user?.id });

  return (
    <div>
      {!data?.user.username && status === 'authenticated' && <p>im a popup</p>}
      <Header />
      <div className={styles.children}>{children}</div>
    </div>
  );
};
