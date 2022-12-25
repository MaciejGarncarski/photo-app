import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';

import styles from './modal.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { ModalOverlay } from '@/components/atoms/modalOverlay/ModalOverlay';
import { Children } from '@/components/Layout/Layout';
export const Modal = () => null;

export const dialogVariant: Variants = {
  visible: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 50,
    opacity: 0.3,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};

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

type ModalHeadingProps = {
  variant?: 'red';
  text: string;
};

const ModalHeading = ({ text, variant }: ModalHeadingProps) => {
  return <h3 className={clsx(variant && styles[`heading-${variant}`], styles.heading)}>{text}</h3>;
};

const ModalClose = ({ onClose }: ModalCloseProps) => {
  return (
    <button className={styles.closeButton} type='button' onClick={onClose}>
      <Icon.Close />
      <span className='visually-hidden'>Close dialog</span>
    </button>
  );
};

const ModalContainer = ({ children }: Children) => {
  return (
    <motion.div
      variants={dialogVariant}
      initial='hidden'
      exit='exit'
      animate='visible'
      className={styles.dialog}
      role='dialog'
    >
      {children}
    </motion.div>
  );
};

Modal.List = ModalList;
Modal.Overlay = ModalOverlay;
Modal.Item = ModalItem;
Modal.Close = ModalClose;
Modal.Heading = ModalHeading;
Modal.Container = ModalContainer;
