import { Message } from '@prisma/client';
import { IconDotsVertical, IconTrash } from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';

import { useAuth } from '@/hooks/useAuth';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { ListModal } from '@/components/molecules/listModal/ListModal';
import { ListModalItem } from '@/components/molecules/listModal/ListModalItem';

import styles from './chatMessage.module.scss';

type PropsTypes = {
  message: Message;
};

export const ChatMessage = ({ message }: PropsTypes) => {
  const queryClient = useQueryClient();
  const { modalOpen, open, close } = useModal();
  const { session } = useAuth();
  const { sender, text, created_at, id, receiver } = message;
  const isSender = sender === session?.user?.id;

  const { mutate } = useMutation(
    async () => {
      return axios.delete(`/api/chat/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['chat', sender, receiver]);
      },
    },
  );

  return (
    <li className={clsx(isSender && styles.messageReceiver, styles.message)}>
      <button type="button" onClick={open} className={styles.options}>
        <IconDotsVertical /> <VisuallyHiddenText text="options" />
      </button>

      <div className={clsx(isSender && styles.contentReceiver, styles.content)}>
        <Avatar userId={sender} />
        <p>{text}</p>
      </div>
      <ModalContainer>
        {modalOpen && (
          <ListModal close={close} headingText="Message options">
            <ListModalItem isLast icon={<IconTrash />} type="button" onClick={mutate}>
              Delete
            </ListModalItem>
          </ListModal>
        )}
      </ModalContainer>
    </li>
  );
};
