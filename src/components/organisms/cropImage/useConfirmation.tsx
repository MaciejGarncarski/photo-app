import { useFinalImages } from '@/src/hooks/useFinalImages';
import { useModal } from '@/src/hooks/useModal';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';

export const useConfirmation = () => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { resetFinalImages } = useFinalImages();

  const onConfirm = () => {
    closeModal();
    resetFinalImages();
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
