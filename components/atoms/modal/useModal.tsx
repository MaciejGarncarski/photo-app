import { useState } from 'react';

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return {
    modalOpen,
    close,
    open,
  };
};
