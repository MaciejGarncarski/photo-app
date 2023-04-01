import { Message } from '@prisma/client';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';

import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/formatDate';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { useDeleteChatMessage } from '@/components/atoms/chatMessage/useDeleteChatMessage';
import { VisuallyHidden } from '@/components/atoms/visuallyHiddenText/VisuallyHidden';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { ListModal } from '@/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/components/organisms/listModal/ListModalItem';

import styles from './chatMessage.module.scss';

type PropsTypes = {
  message: Message;
};

export const ChatMessage = ({ message }: PropsTypes) => {
  const { modalOpen, open, close } = useModal();
  const { session } = useAuth();
  const { sender, text, created_at, id, receiver } = message;
  const isReceiver = sender !== session?.user?.id;
  const formattedDate = formatDate(created_at);

  const { mutate } = useDeleteChatMessage({ receiver, sender });

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
