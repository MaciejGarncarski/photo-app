import { Icon } from '@/components/atoms/icons/Icons';
import { Modal } from '@/components/atoms/modal/Modal';

type ConfirmationModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationModal = ({ setIsOpen, onConfirm, onCancel }: ConfirmationModalProps) => {
  return (
    <Modal.Overlay setOpen={setIsOpen}>
      <Modal.Container>
        <Modal.Heading variant="red" text="Are you sure?" />
        <Modal.List>
          <Modal.ListItem withButton isFirst variant="red" onClick={() => onConfirm()}>
            <Icon.Trash />
            Yes, delete
          </Modal.ListItem>
          <Modal.ListItem withButton onClick={onCancel}>
            <Icon.Close />
            No, go back
          </Modal.ListItem>
        </Modal.List>
      </Modal.Container>
    </Modal.Overlay>
  );
};
