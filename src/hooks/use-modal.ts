'use client';

import { usePreventScroll } from '@react-aria/overlays';
import { useState } from 'react';

export const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  usePreventScroll({ isDisabled: !isModalOpen });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    closeModal,
    openModal,
  };
};
