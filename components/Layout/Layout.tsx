import { signIn, useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import styles from './layout.module.scss';

export type Children = {
  children: ReactNode;
};

export const Layout = ({ children }: Children) => {
  const { data: session } = useSession();

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.heading}>Delaygram</h1>
        <form className={styles.form}>
          <label className={styles.label}>
            <span className='visually-hidden'>Search</span>
            <input className={styles.input} type='text' placeholder='Search' />
          </label>
        </form>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {!session && (
              <>
                <li>
                  <button onClick={() => signIn('google')}>Sign in</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
};
