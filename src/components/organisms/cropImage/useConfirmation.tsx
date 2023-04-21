import { useModal } from '@/src/hooks/useModal';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';

type Arguments = {
  resetState: () => void;
};

export const useConfirmation = ({ resetState }: Arguments) => {
  const { openModal, closeModal, isModalOpen } = useModal();

  const onConfirm = () => {
    closeModal();
    resetState();
  };

  const DiffrentImageConfirmation = () => {
    return (
      <ConfirmationAlert
        isVisible={isModalOpen}
        headingText="Select diffrent image?"
        closeModal={closeModal}
        onConfirm={onConfirm}
      />
    );
  };

  return { DiffrentImageConfirmation, openModal, closeModal };
};
