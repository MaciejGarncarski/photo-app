"use client";

import type { ReactNode } from "react";
import ReactFocusLock from "react-focus-lock";

import { ModalBackdrop } from "@/components/modals/modal-backdrop/modal-backdrop";

import styles from "./confirmation-dialog.module.scss";

type Props = {
  closeModal: () => void;
  text: string;
  children: ReactNode;
  isVisible: boolean;
};

export const ConfirmationDialog = ({
  text,
  children,
  closeModal,
  isVisible,
}: Props) => {
  return (
    <>
      {isVisible && (
        <ModalBackdrop closeModal={closeModal}>
          <ReactFocusLock autoFocus={false}>
            <div role="alertdialog" className={styles.container}>
              <div className={styles.headingContainer}>
                <h3 className={styles.heading}>Are you sure?</h3>
              </div>
              <p className={styles.text}>{text}</p>
              <div className={styles.buttonsRow}>{children}</div>
            </div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </>
  );
};
