import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { motion, Variants } from 'framer-motion';

import styles from './postOptions.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { Modal } from '@/components/molecules/modal/Modal';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useCollection } from '@/components/pages/collection/useCollection';

type PostOptionsProps = {
  setIsOpen: (isOpen: boolean) => void;
  postID: number;
};

type CollectionMutation = {
  type?: 'remove';
};

const variant: Variants = {
  visible: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 50,
    opacity: 0.3,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};

export const PostOptions = ({ setIsOpen, postID }: PostOptionsProps) => {
  const { session } = useAuth();
  const onModalClose = () => setIsOpen(false);

  const { data } = useCollection({ userID: session?.user?.id ?? '' });

  console.log(data);

  const { mutate } = useMutation(async ({ type }: CollectionMutation) => {
    if (type === 'remove') {
      return;
    }
    await axios.put('/api/collection', {
      userID: session?.user?.id,
      postID,
    });
  });

  return (
    <Modal.Overlay setOpen={setIsOpen}>
      <motion.div
        variants={variant}
        initial='hidden'
        exit='exit'
        animate='visible'
        className={styles.dialog}
        role='dialog'
      >
        <Modal.Close onClose={onModalClose} />
        <Modal.List>
          <Modal.Item isFirst onClick={() => mutate({ type: undefined })}>
            <Icon.Bookmark />
            save to collection
          </Modal.Item>
          <Modal.Item>
            <Icon.Edit />
            edit
          </Modal.Item>
          <Modal.Item variant='red'>
            <Icon.Trash />
            delete
          </Modal.Item>
        </Modal.List>
      </motion.div>
    </Modal.Overlay>
  );
};
