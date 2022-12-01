import clsx from 'clsx';
import Link from 'next/link';

import styles from '@/components/molecules/headerButtons/headerButtons.module.scss';

import { Children } from '@/components/Layout/Layout';
import { ListData } from '@/components/molecules/headerButtons/HeaderButtons';

const ListItem = ({ children }: Children) => {
  return <li className={styles.listItem}>{children}</li>;
};

export const HeaderButton = ({ href, onClick, alt, title, icon }: ListData) => {
  if (href) {
    return (
      <ListItem>
        <Link href={href} data-tip={alt} className={clsx(styles.listItemChild)}>
          {icon}
        </Link>
        <span className={styles.listItemTitle}>{title}</span>
      </ListItem>
    );
  }

  if (onClick) {
    return (
      <ListItem>
        <button
          className={clsx(styles.listItemChild, styles.listItemButton)}
          type='button'
          onClick={onClick}
          data-tip={alt}
        >
          {icon}
          <span className='visually-hidden'>{alt}</span>
          <span className={styles.listItemTitle}>{title}</span>
        </button>
      </ListItem>
    );
  }
  return null;
};
