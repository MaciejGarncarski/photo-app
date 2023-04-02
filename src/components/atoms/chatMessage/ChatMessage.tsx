import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';

import { useChatMessage } from '@/src/components/atoms/chatMessage/useChatMessage';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';
import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';

import styles from './chatMessage.module.scss';

export type Message = {
  id: string;
  text: string;
  sender: string;
  receiver: string;
  createdAt: Date;
};

type PropsTypes = {
  message: Message;
};

export const ChatMessage = ({ message }: PropsTypes) => {
  const { sender, receiver, text, createdAt, id } = message;
  const { close, formattedDate, isReceiver, modalOpen, mutate, open } = useChatMessage({
    sender,
    receiver,
    createdAt,
  });

  return (
    <li className={clsx(isReceiver && styles.messageReceiver, styles.message)}>
      {!isReceiver && (
        <button type="button" onClick={open} className={styles.options}>
          <IconDotsVertical /> <VisuallyHidden>Options</VisuallyHidden>
        </button>
      )}
      <p className={clsx(isReceiver && styles.timeReceiver, styles.time)}>
        <time dateTime={createdAt.toString()}>{formattedDate}</time>
      </p>
      <div className={clsx(isReceiver && styles.contentReceiver, styles.content)}>
        <Avatar userId={sender} size="small" />
        <p>{text}</p>
      </div>
      <ListModal isVisible={modalOpen} close={close} headingText="Message options">
        <ListModalItem isLast icon={<IconTrash />} type="button" onClick={() => mutate({ id })}>
          Delete
        </ListModalItem>
      </ListModal>
    </li>
  );
};
