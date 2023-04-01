import { Message } from '@prisma/client';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { useChatMessage } from '@/components/atoms/chatMessage/useChatMessage';
import { VisuallyHidden } from '@/components/atoms/visuallyHiddenText/VisuallyHidden';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { ListModal } from '@/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/components/organisms/listModal/ListModalItem';

import styles from './chatMessage.module.scss';

type PropsTypes = {
  message: Message;
};

export const ChatMessage = ({ message }: PropsTypes) => {
  const { sender, receiver, text, created_at, id } = message;
  const { close, formattedDate, isReceiver, modalOpen, mutate, open } = useChatMessage({
    sender,
    receiver,
    created_at,
  });

  return (
    <li className={clsx(isReceiver && styles.messageReceiver, styles.message)}>
      {!isReceiver && (
        <button type="button" onClick={open} className={styles.options}>
          <IconDotsVertical /> <VisuallyHidden>Options</VisuallyHidden>
        </button>
      )}
      <p className={clsx(isReceiver && styles.timeReceiver, styles.time)}>
        <time dateTime={created_at.toString()}>{formattedDate}</time>
      </p>
      <div className={clsx(isReceiver && styles.contentReceiver, styles.content)}>
        <Avatar userId={sender} size="small" />
        <p>{text}</p>
      </div>
      <ModalContainer>
        {modalOpen && (
          <ListModal close={close} headingText="Message options">
            <ListModalItem isLast icon={<IconTrash />} type="button" onClick={() => mutate({ id })}>
              Delete
            </ListModalItem>
          </ListModal>
        )}
      </ModalContainer>
    </li>
  );
};
