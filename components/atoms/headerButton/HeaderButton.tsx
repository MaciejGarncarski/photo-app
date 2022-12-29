import clsx from 'clsx';
import Link from 'next/link';

import styles from '@/components/molecules/headerButtons/headerButtons.module.scss';

import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { ListData } from '@/components/molecules/headerButtons/HeaderButtons';

export const HeaderButton = ({ href, onClick, alt, title, icon }: ListData) => {
  if (href) {
    return (
      <li className={styles.listItemChild}>
        <Tooltip variant='bottom' content={alt}>
          <span className={styles.listItem}>
            <Link href={href} className={clsx(styles.listItemChild)}>
              {icon}
            </Link>
            <span className={styles.listItemTitle}>{title}</span>
          </span>
        </Tooltip>
      </li>
    );
  }

  if (onClick) {
    return (
      <li>
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
      </li>
    );
  }
  return null;
};
