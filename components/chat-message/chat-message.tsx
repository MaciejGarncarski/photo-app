import { DotsThree, Trash } from '@phosphor-icons/react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

import { useIsTabletOrMobile } from '@/hooks/use-is-tablet-or-mobile';
import { useLongPress } from '@/hooks/use-long-press';
import { useModal } from '@/hooks/use-modal';

import { Button } from '@/components/buttons/button/button';
import { ChatMessageDropdown } from '@/components/chat-message/chat-message-dropdown';
import { useDeleteChatMessage } from '@/components/chat-message-group/use-delete-message';
import { useDropdownAtom } from '@/components/chat-message-group/use-dropdown-atom';
import { ConfirmationDialog } from '@/components/modals/confirmation-dialog/confirmation-dialog';

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
  const { isTabletOrMobile } = useIsTabletOrMobile();
  const { isOpen, setDropdown, closeDropdown, openDropdownForCurrentMessage } =
    useDropdownAtom({ messageId: id });

  const { onTouchEnd, onTouchStart } = useLongPress({
    onStart: closeDropdown,
    onEnd: openDropdownForCurrentMessage,
  });

  const { mutate } = useDeleteChatMessage({ receiverId });
  const confirmation = useModal();

  const handleDelete = () => {
    mutate({ messageId: id });
  };

  return (
    <>
      <Dropdown.Root
        modal={false}
        open={isOpen}
        onOpenChange={(isOpen) => setDropdown({ open: isOpen, messageId: id })}
      >
        <div
          className={clsx(
            isReceiver && styles.textContainerReceiver,
            styles.textContainer,
          )}
        >
          {!isTabletOrMobile && (
            <Dropdown.Trigger asChild>
              <button
                type="button"
                onClick={() => {
                  if (!isOpen) {
                    openDropdownForCurrentMessage();
                  }
                }}
                className={clsx(
                  isReceiver && styles.optionsReceiver,
                  isOpen && styles.optionsOpen,
                  styles.options,
                )}
              >
                <DotsThree />
                <span className="visually-hidden">options</span>
              </button>
            </Dropdown.Trigger>
          )}

          {isTabletOrMobile ? (
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
              <ChatMessageDropdown
                messageText={text}
                closeModal={closeDropdown}
                createdAt={createdAt}
                isReceiver={isReceiver}
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
