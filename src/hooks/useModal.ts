import { useState } from 'react';

import { lock, unlock } from '@/src/utils/bodyLock';

export const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const closeModal = () => {
    setIsModalOpen(false);
    unlock();
  };

  const openModal = () => {
    lock();
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    closeModal,
    openModal,
  };
};
