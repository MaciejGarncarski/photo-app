import { IconCheck, IconTrash } from '@tabler/icons';
import { ReactNode } from 'react';

import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';
import { Modal } from '@/components/atoms/modal/Modal';
import { ModalClose } from '@/components/atoms/modal/ModalClose';

type ConfirmationModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmIcon?: ReactNode;
  variant?: 'positive' | 'negative';
  confirmText: string;
};

export const ConfirmationModal = ({
  setIsOpen,
  onConfirm,
  onCancel,
  confirmText,
  confirmIcon,
  variant,
}: ConfirmationModalProps) => {
  const handleCancel = onCancel ? onCancel : () => setIsOpen(false);

  return (
    <Modal.Overlay setOpen={setIsOpen}>
      <Modal.Container>
        <ModalClose onClose={handleCancel} />
        <Modal.Heading variant={variant === 'positive' ? undefined : 'red'} text="Are you sure?" />
        <Modal.List>
          <Modal.ListItem
            withButton
            isFirst
            variant={variant === 'positive' ? undefined : 'red'}
            onClick={() => onConfirm()}
          >
            {confirmIcon}
            {!confirmIcon && variant === 'positive' ? <IconCheck /> : <IconTrash />}
            {confirmText}
          </Modal.ListItem>
          <Modal.ListItem withButton onClick={handleCancel}>
            <IconXWrapper />
            Cancel
          </Modal.ListItem>
        </Modal.List>
      </Modal.Container>
    </Modal.Overlay>
  );
};
