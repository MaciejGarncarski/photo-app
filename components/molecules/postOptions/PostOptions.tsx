import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

import styles from './postOptions.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { Modal } from '@/components/molecules/modal/Modal';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { useDeletePost } from '@/components/molecules/postOptions/useDeletePost';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

type PostOptionsProps = {
  setIsOpen: (isOpen: boolean) => void;
  post: PostData;
};

export const dialogVariant: Variants = {
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

export const PostOptions = ({ setIsOpen, post }: PostOptionsProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { id, isInCollection, author } = post;
  const { mutate } = useCollectionMutation();
  const deletePostMutation = useDeletePost();
  const { session } = useAuth();
  const { data } = useAccount({ id: session?.user?.id ?? '' });

  const isAbleToModify = author.id === data?.user?.id || data?.user?.role === 'ADMIN';

  const onModalClose = () => setIsOpen(false);

  const handleCollection = () => {
    mutate({ type: isInCollection ? 'remove' : undefined, postID: id });
  };

  const handleDeletePost = () => {
    deletePostMutation.mutate({ postID: id });
  };

  if (deletePostMutation.isLoading) {
    return (
      <Modal.Overlay setOpen={setIsOpen}>
        <Modal.List>
          <Modal.Item>Deleting</Modal.Item>
        </Modal.List>
      </Modal.Overlay>
    );
  }

  if (isDeleting) {
    return (
      <Modal.Overlay setOpen={setIsOpen}>
        <motion.div
          variants={dialogVariant}
          initial='hidden'
          exit='exit'
          animate='visible'
          className={styles.dialog}
          role='dialog'
        >
          <Modal.Heading text='Are you sure?' />
          <Modal.List>
            <Modal.Item isFirst variant='red' onClick={handleDeletePost}>
              <Icon.Trash />
              Yes, delete
            </Modal.Item>
            <Modal.Item onClick={() => setIsDeleting(false)}>
              <Icon.Close />
              No, go back
            </Modal.Item>
          </Modal.List>
        </motion.div>
      </Modal.Overlay>
    );
  }

  return (
    <Modal.Overlay setOpen={setIsOpen}>
      <motion.div
        variants={dialogVariant}
        initial='hidden'
        exit='exit'
        animate='visible'
        className={styles.dialog}
        role='dialog'
      >
        <Modal.Close onClose={onModalClose} />
        <Modal.List>
          <Modal.Item isFirst onClick={handleCollection}>
            {isInCollection ? (
              <>
                <Icon.BookmarkActive />
                Remove from collection
              </>
            ) : (
              <>
                <Icon.Bookmark />
                Save to collection
              </>
            )}
          </Modal.Item>
          {isAbleToModify && (
            <>
              <Modal.Item>
                <Icon.Edit />
                edit (not working)
              </Modal.Item>
              <Modal.Item variant='red' onClick={() => setIsDeleting(true)}>
                <Icon.Trash />
                Delete post
              </Modal.Item>
            </>
          )}
          <Modal.Item onClick={onModalClose}>
            <Icon.Close />
            Close
          </Modal.Item>
        </Modal.List>
      </motion.div>
    </Modal.Overlay>
  );
};
