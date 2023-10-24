import { DotsThree, Trash } from '@phosphor-icons/react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { useLongPress } from '@/src/hooks/use-long-press';
import { useModal } from '@/src/hooks/use-modal';

import { Button } from '@/src/components/buttons/button/button';
import { ChatMessagePopover } from '@/src/components/chat-message/chat-message-popover';
import { useDeleteChatMessage } from '@/src/components/chat-message-group/use-delete-message';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';

import styles from './chat-message.module.scss';

type Props = {
  text: string;
  createdAt: string;
  isReceiver: boolean;
  receiverId: string;
  id: string;
};

export const ChatMessage = ({
  text,
  createdAt,
  isReceiver,
  id,
  receiverId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useIsMobile();

  const { onTouchEnd, onTouchStart } = useLongPress({
    onStart: () => setIsOpen(false),
    onEnd: () => setIsOpen(true),
  });

  const { mutate } = useDeleteChatMessage({ receiverId });
  const confirmation = useModal();

  const handleDelete = () => {
    mutate({ messageId: id });
  };

  return (
    <>
      <Dropdown.Root
        modal={!confirmation.isModalOpen}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className={styles.textContainer}>
          {!isReceiver && !isMobile && (
            <Dropdown.Trigger asChild>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={clsx(isOpen && styles.optionsOpen, styles.options)}
              >
                <DotsThree />
                <span className="visually-hidden">options</span>
              </button>
            </Dropdown.Trigger>
          )}

          {isMobile ? (
            <Dropdown.Trigger asChild>
              <button
                type="button"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                className={styles.text}
              >
                {text}
              </button>
            </Dropdown.Trigger>
          ) : (
            <span className={styles.text}>{text}</span>
          )}
          <AnimatePresence mode="wait">
            {isOpen && (
              <ChatMessagePopover
                messageText={text}
                closeModal={() => setIsOpen(false)}
                createdAt={createdAt}
                confirmationModal={confirmation}
              />
            )}
          </AnimatePresence>
        </div>
      </Dropdown.Root>

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
