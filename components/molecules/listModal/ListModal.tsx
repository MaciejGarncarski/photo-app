import { ReactNode } from 'react';

import { Backdrop } from '@/components/atoms/modal/Backdrop';
import { ModalClose } from '@/components/atoms/modal/ModalClose';

import styles from './listModal.module.scss';

type PropsTypes = {
  close: () => void;
  headingText: string;
  children: ReactNode;
};

export const ListModal = ({ close, headingText, children }: PropsTypes) => {
  return (
    <Backdrop close={close}>
      <div className={styles.container}>
        <h3 className={styles.heading}>{headingText}</h3>
        <ModalClose onClose={close} />
        <ul className={styles.list}>{children}</ul>
      </div>
    </Backdrop>
  );
};
