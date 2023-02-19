import { useState } from 'react';

export const useModal = (initialState?: boolean) => {
  const [modalOpen, setModalOpen] = useState<boolean>(Boolean(initialState));

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return {
    modalOpen,
    close,
    open,
  };
};
