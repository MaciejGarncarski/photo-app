import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';

import { Avatar } from '@/src/components/avatar/avatar';
import { useChatMessage } from '@/src/components/chat-message/use-message';
import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal/list-modal-item';
import { ChatMessage as TChatMessage } from '@/src/schemas/chat';

import styles from './ChatMessage.module.scss';

type PropsTypes = {
  message: TChatMessage;
};

export const ChatMessage = ({ message }: PropsTypes) => {
  const { senderId, receiverId, text, createdAt, id } = message;
  const {
    closeModal,
    formattedDate,
    isReceiver,
    isModalOpen,
    mutate,
    openModal,
  } = useChatMessage({
    receiverId,
    createdAt,
  });

  const handleDelete = () => {
    mutate({ messageId: id });
  };

  return (
    <li className={clsx(isReceiver && styles.messageReceiver, styles.message)}>
      {!isReceiver && (
        <button type="button" onClick={openModal} className={styles.options}>
          <IconDotsVertical />
          <span className="visually-hidden">options</span>
        </button>
      )}
      <p className={clsx(isReceiver && styles.timeReceiver, styles.time)}>
        <time dateTime={createdAt.toString()}>{formattedDate}</time>
      </p>
      <div
        className={clsx(isReceiver && styles.contentReceiver, styles.content)}
      >
        <Avatar userId={senderId} size="small" />
        <p>{text}</p>
      </div>
      <ListModal
        isVisible={isModalOpen}
        closeModal={closeModal}
        headingText="Message options"
      >
        <ListModalItem
          isLast
          icon={<IconTrash />}
          type="button"
          onClick={handleDelete}
        >
          Delete
        </ListModalItem>
      </ListModal>
    </li>
  );
};
