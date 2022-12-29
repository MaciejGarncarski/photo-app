import { Icon } from '@/components/atoms/icons/Icons';
import { Modal } from '@/components/molecules/modal/Modal';

type ConfirmationModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationModal = ({ setIsOpen, onConfirm, onCancel }: ConfirmationModalProps) => {
  return (
    <Modal.Overlay setOpen={setIsOpen}>
      <Modal.Container>
        <Modal.Heading variant='red' text='Are you sure?' />
        <Modal.List>
          <Modal.Item isFirst variant='red' onClick={() => onConfirm()}>
            <Icon.Trash />
            Yes, delete
          </Modal.Item>
          <Modal.Item onClick={onCancel}>
            <Icon.Close />
            No, go back
          </Modal.Item>
        </Modal.List>
      </Modal.Container>
    </Modal.Overlay>
  );
};
