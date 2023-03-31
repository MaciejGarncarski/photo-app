import { useState } from 'react';

import { lock, unlock } from '@/utils/bodyLock';

export const useModal = (initialState?: boolean) => {
  const [modalOpen, setModalOpen] = useState<boolean>(Boolean(initialState));

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
