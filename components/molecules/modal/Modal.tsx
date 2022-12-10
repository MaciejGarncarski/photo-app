import clsx from 'clsx';

import styles from './modal.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { ModalOverlay } from '@/components/atoms/modalOverlay/ModalOverlay';
import { Children } from '@/components/Layout/Layout';

export const Modal = () => null;

type ModalItemProps = {
  variant?: 'red';
  isFirst?: boolean;
  onClick?: () => void;
} & Children;

const ModalList = ({ children }: Children) => {
  return <ul className={styles.list}>{children}</ul>;
};

const ModalItem = ({ children, variant, isFirst, onClick }: ModalItemProps) => {
  return (
    <li className={clsx(isFirst && styles['item-first'], styles[`item-${variant}`], styles.item)}>
      <button
        type='button'
        className={styles.itemButton}
        onClick={onClick}
        disabled={Boolean(!onClick)}
      >
        {children}
      </button>
    </li>
  );
};

type ModalCloseProps = {
  onClose: () => void;
};

const ModalClose = ({ onClose }: ModalCloseProps) => {
  return (
    <button className={styles.closeButton} type='button' onClick={onClose}>
      <Icon.Close />
      <span className='visually-hidden'>Close dialog</span>
    </button>
  );
};

Modal.List = ModalList;
Modal.Overlay = ModalOverlay;
Modal.Item = ModalItem;
Modal.Close = ModalClose;
