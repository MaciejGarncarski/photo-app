import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';

import { useChatMessage } from '@/src/components/atoms/chatMessage/useChatMessage';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';

import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';

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
          <IconDotsVertical /> <VisuallyHidden>Options</VisuallyHidden>
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
