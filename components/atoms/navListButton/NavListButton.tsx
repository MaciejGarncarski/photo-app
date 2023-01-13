import clsx from 'clsx';
import Link from 'next/link';

import styles from '@/components/molecules/navButtons/navButtons.module.scss';

import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { ListData } from '@/components/molecules/navButtons/NavButtons';

export const NavListButton = ({ href, onClick, title, icon }: ListData) => {
  if (href) {
    return (
      <li className={styles.listItemChild}>
        <Tooltip variant="bottom" content={title}>
          <span className={styles.listItem}>
            <Link href={href} className={clsx(styles.listItemChild)}>
              {icon}
            </Link>
          </span>
        </Tooltip>
      </li>
    );
  }

  if (onClick) {
    return (
      <li>
        <button className={clsx(styles.listItemChild, styles.listItemButton)} type="button" onClick={onClick}>
          {icon}
          <span className="visually-hidden">{title}</span>
        </button>
      </li>
    );
  }
  return null;
};
