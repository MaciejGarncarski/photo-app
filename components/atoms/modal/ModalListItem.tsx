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
  disabled?: boolean;
};

type WithLink = {
  withLink: boolean;
  href: string;
  withButton?: never;
  onClick?: never;
  disabled?: never;
};

type Default = {
  withLink?: never;
  href?: never;
  withButton?: never;
  onClick?: never;
  disabled?: never;
};

type ModalListItemConditionalProps = WithButton | WithLink | Default;

type ModalListItemProps = ModalListItemCommonProps & ModalListItemConditionalProps;

export const ModalListItem = ({
  isFirst,
  withButton,
  withLink,
  children,
  variant,
  onClick,
  disabled,
  href,
}: ModalListItemProps) => {
  const className = clsx(isFirst && styles['item-first'], styles[`item-${variant}`], styles.item);

  if (withButton) {
    return (
      <li className={className}>
        <ModalButton onClick={onClick} disabled={disabled}>
          {children}
        </ModalButton>
      </li>
    );
  }

  if (withLink) {
    return (
      <li className={className}>
        <Link className={styles.itemLink} href={href}>
          {children}
        </Link>
      </li>
    );
  }

  return (
    <li className={className}>
      <p className={styles.itemText}>{children}</p>
    </li>
  );
};
