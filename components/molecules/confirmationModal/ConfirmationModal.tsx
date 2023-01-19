import { Icon } from '@/components/atoms/icons/Icons';
import { Modal } from '@/components/atoms/modal/Modal';
import { ModalClose } from '@/components/atoms/modal/ModalClose';

type ConfirmationModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;

  variant?: 'positive' | 'negative';
  confirmText: string;
};

export const ConfirmationModal = ({ setIsOpen, onConfirm, onCancel, confirmText, variant }: ConfirmationModalProps) => {
  return (
    <Modal.Overlay setOpen={setIsOpen}>
      <Modal.Container>
        <ModalClose onClose={onCancel} />
        <Modal.Heading variant={variant === 'positive' ? undefined : 'red'} text="Are you sure?" />
        <Modal.List>
          <Modal.ListItem
            withButton
            isFirst
            variant={variant === 'positive' ? undefined : 'red'}
            onClick={() => onConfirm()}
          >
            {variant === 'positive' ? <Icon.Success /> : <Icon.Trash />}
            {confirmText}
          </Modal.ListItem>
          <Modal.ListItem withButton onClick={onCancel}>
            <Icon.Close />
            Cancel
          </Modal.ListItem>
        </Modal.List>
      </Modal.Container>
    </Modal.Overlay>
  );
};
