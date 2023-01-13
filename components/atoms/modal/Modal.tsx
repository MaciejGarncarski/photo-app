import { Variants } from 'framer-motion';

import { ModalButton } from '@/components/atoms/modal/ModalButton';
import { ModalClose } from '@/components/atoms/modal/ModalClose';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { ModalHeading } from '@/components/atoms/modal/ModalHeading';
import { ModalList } from '@/components/atoms/modal/ModalList';
import { ModalListItem } from '@/components/atoms/modal/ModalListItem';
import { ModalOverlay } from '@/components/atoms/modal/ModalOverlay';

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
    scale: 0.5,
    transition: {
      type: 'ease',
      duration: 0.2,
    },
  },
};

export const Modal = () => null;

Modal.Overlay = ModalOverlay;
Modal.Button = ModalButton;
Modal.Close = ModalClose;
Modal.Container = ModalContainer;
Modal.Heading = ModalHeading;
Modal.List = ModalList;
Modal.ListItem = ModalListItem;
