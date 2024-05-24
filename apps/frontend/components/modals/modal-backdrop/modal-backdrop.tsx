import type { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./modal-backdrop.module.scss";

type Props = {
  closeModal: () => void;
  children: ReactNode;
};

export const ModalBackdrop = ({ closeModal, children }: Props) => {
  const handleOverlayClick = (mouseEv: MouseEvent) => {
    if (mouseEv.target === mouseEv.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div onClick={handleOverlayClick} className={styles.backdrop}>
      {children}
    </div>,
    document.body
  );
};
