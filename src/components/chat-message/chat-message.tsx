import { DotsThree, Trash } from '@phosphor-icons/react';
import clsx from 'clsx';

import { useAuth } from '@/src/hooks/use-auth';
import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { useLongPress } from '@/src/hooks/use-long-press';
import { useModal } from '@/src/hooks/use-modal';

import { Avatar } from '@/src/components/avatar/avatar';
import { Button } from '@/src/components/buttons/button/button';
import { useChatMessage } from '@/src/components/chat-message/use-message';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';
import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal-item/list-modal-item';
import { ChatMessage as TChatMessage } from '@/src/schemas/chat.schema';

import styles from './chat-message.module.scss';

type Props = {
  messageGroup: Array<TChatMessage>;
};

export const ChatMessage = ({ messageGroup }: Props) => {
  const { senderId, receiverId, createdAt, id } = messageGroup[0];
  const { sessionUser } = useAuth();
  const { isMobile } = useIsMobile();
  const confirmation = useModal();

  const { closeModal, isModalOpen, mutate, openModal } = useChatMessage({
    receiverId,
    createdAt,
  });

  const { onTouchEnd, onTouchStart } = useLongPress({
    onStart: closeModal,
    onEnd: openModal,
  });

  const handleDelete = () => {
    mutate({ messageId: id });
  };

  const isReceiver = receiverId === sessionUser?.id;

  return (
    <>
      <li
        className={clsx(isReceiver && styles.messageReceiver, styles.message)}
      >
        <div className={styles.textColumn}>
          {messageGroup.map(({ text, id }) => {
            const isReceiver = receiverId === sessionUser?.id;

            return (
              <div key={id} className={styles.textContainer}>
                {!isReceiver && !isMobile && (
                  <button
                    type="button"
                    onClick={openModal}
                    className={styles.options}
                  >
                    <DotsThree />
                    <span className="visually-hidden">options</span>
                  </button>
                )}
                <button
                  type="button"
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  className={styles.text}
                >
                  {text}
                </button>
              </div>
            );
          })}
        </div>
        {isReceiver && (
          <div className={styles.avatar}>
            <Avatar userId={senderId} size="xs" />
          </div>
        )}
      </li>

      <ListModal
        isVisible={isModalOpen}
        closeModal={closeModal}
        headingText="Message options"
      >
        <ListModalItem
          icon={<Trash />}
          type="button"
          onClick={confirmation.openModal}
        >
          Delete
        </ListModalItem>
      </ListModal>

      <ConfirmationDialog
        closeModal={confirmation.closeModal}
        isVisible={confirmation.isModalOpen}
        text="Do you want to delete your message?"
      >
        <Button type="button" onClick={handleDelete} variant="destructive">
          Delete <Trash />
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={confirmation.closeModal}
        >
          Close
        </Button>
      </ConfirmationDialog>
    </>
  );
};
