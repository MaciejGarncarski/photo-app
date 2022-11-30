import clsx from 'clsx';
import Link from 'next/link';

import styles from '@/components/molecules/headerButtons/headerButtons.module.scss';

import { ListData } from '@/components/molecules/headerButtons/HeaderButtons';

export const HeaderButton = ({ href, onClick, alt, title, icon }: ListData) => {
  if (href) {
    return (
      <li className={styles.listItem} key={alt} data-tip={alt}>
        <Link href={href} className={clsx(styles.listItemChild)}>
          {icon}
        </Link>
        <span className={styles.listItemTitle}>{title}</span>
      </li>
    );
  }

  if (onClick) {
    return (
      <li className={styles.listItem} key={alt} data-tip={alt}>
        <button
          className={clsx(styles.listItemChild, styles.listItemButton)}
          type='button'
          onClick={onClick}
        >
          {icon}
          <span className='visually-hidden'>{alt}</span>
          <span className={styles.listItemTitle}>{title}</span>
        </button>
      </li>
    );
  }
  return null;
};
