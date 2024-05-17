import { IconContext } from '@phosphor-icons/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './button-link.module.scss';

type Props = {
  href: string;
  children: ReactNode;
};

export const ButtonLink = ({ children, href }: Props) => {
  return (
    <IconContext.Provider
      value={{
        weight: 'bold',
        size: 20,
      }}
    >
      <Link href={href} className={styles.button}>
        {children}
      </Link>
    </IconContext.Provider>
  );
};
