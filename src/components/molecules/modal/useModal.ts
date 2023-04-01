import { useState } from 'react';

import { lock, unlock } from '@/utils/bodyLock';

export const useModal = (initialState = false) => {
  const [modalOpen, setModalOpen] = useState(initialState);

  const close = () => {
    setModalOpen(false);
    unlock();
  };

  const open = () => {
    lock();
    setModalOpen(true);
  };

  return {
    modalOpen,
    close,
    open,
  };
};
