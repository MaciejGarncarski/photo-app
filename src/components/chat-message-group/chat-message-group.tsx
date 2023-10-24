import clsx from 'clsx';

import { useAuth } from '@/src/hooks/use-auth';

import { Avatar } from '@/src/components/avatar/avatar';
import { ChatMessage } from '@/src/components/chat-message/chat-message';
import { ChatMessage as TChatMessage } from '@/src/schemas/chat.schema';

import styles from './chat-message-group.module.scss';

type Props = {
  messageGroup: Array<TChatMessage>;
};

export const ChatMessageGroup = ({ messageGroup }: Props) => {
  const { senderId, receiverId } = messageGroup[0];
  const { sessionUser } = useAuth();

  const isReceiver = receiverId === sessionUser?.id;

  return (
    <li className={clsx(isReceiver && styles.messageReceiver, styles.message)}>
      <div className={styles.textColumn}>
        {messageGroup.map(({ text, id, createdAt, receiverId }) => {
          const isReceiver = receiverId === sessionUser?.id;

          return (
            <ChatMessage
              createdAt={createdAt}
              isReceiver={isReceiver}
              text={text}
              id={id}
              receiverId={receiverId}
              key={id}
            />
          );
        })}
      </div>

      {isReceiver && (
        <div className={styles.avatar}>
          <Avatar userId={senderId} size="xs" />
        </div>
      )}
    </li>
  );
};
