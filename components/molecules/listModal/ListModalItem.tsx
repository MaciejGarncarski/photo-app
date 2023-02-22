import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './listModal.module.scss';

type PropsTypes = {
  icon: ReactNode;
  children: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  isLoading?: boolean;
  loadingText?: string;
};

type WithButton = {
  type: 'button';
  href?: never;
  onClick: () => void;
  disabled?: boolean;
};

type WithLink = {
  type: 'link';
  href: string;
  onClick?: never;
  disabled?: never;
};

type ModalListItemConditionalProps = WithButton | WithLink;

type ModalListItemProps = PropsTypes & ModalListItemConditionalProps;

export const ListModalItem = ({
  type,
  icon,
  children,
  disabled,
  href,
  onClick,
  isFirst,
  isLast,
  isLoading,
  loadingText,
}: ModalListItemProps) => {
  const listClassName = clsx(isLast && styles.listItemLast, isFirst && styles.listItemFirst, styles.listItem);

  if (isLoading) {
    return (
      <li className={listClassName}>
        <div className={styles.item}>{loadingText}</div>
      </li>
    );
  }

  return (
    <li className={listClassName}>
      {type === 'button' && (
        <button type="button" onClick={onClick} disabled={disabled} className={styles.item}>
          {icon}
          {children}
        </button>
      )}
      {type === 'link' && (
        <Link href={href} className={styles.item}>
          {icon}
          {children}
        </Link>
      )}
    </li>
  );
};
