import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './modal.module.scss';

import { ModalButton } from '@/components/atoms/modal/ModalButton';

type ModalListItemCommonProps = {
  variant?: 'red';
  isFirst?: boolean;
  children: ReactNode;
};

type WithButton = {
  withLink?: never;
  href?: never;
  withButton: boolean;
  onClick: () => void;
};

type WithLink = {
  withLink: boolean;
  href: string;
  withButton?: never;
  onClick?: never;
};

type OnlyListItem = {
  withLink?: never;
  href?: never;
  withButton?: never;
  onClick?: never;
};

type ModalListItemConditionalProps = WithButton | WithLink | OnlyListItem;

type ModalListItemProps = ModalListItemCommonProps & ModalListItemConditionalProps;

export const ModalListItem = ({
  isFirst,
  withButton,
  withLink,
  children,
  variant,
  onClick,
  href,
}: ModalListItemProps) => {
  const className = clsx(isFirst && styles['item-first'], styles[`item-${variant}`], styles.item);

  if (withButton) {
    return (
      <li className={className}>
        <ModalButton onClick={onClick}>{children}</ModalButton>
      </li>
    );
  }

  if (withLink) {
    return (
      <li className={className}>
        <Link className={styles.link} href={href}>
          {children}
        </Link>
      </li>
    );
  }

  return <li className={clsx(styles.link, className)}>{children}</li>;
};
