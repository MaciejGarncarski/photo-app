import { Clock, Copy, Trash } from '@phosphor-icons/react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { formatDateChat } from '@/src/utils/format-date-chat';

import styles from './chat-message.module.scss';

type Props = {
  createdAt: string;
  messageText: string;
  closeModal: () => void;
  confirmationModal: {
    isModalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
  };
};

export const ChatMessagePopover = ({
  createdAt,
  confirmationModal,
  messageText,
  closeModal,
}: Props) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      toast.success('Copied.');
      closeModal();
    } catch (err) {
      toast.error('Cannot coppy message.');
    }
  };

  return (
    <Dropdown.Portal forceMount>
      <Dropdown.Content side="top" sideOffset={0} asChild>
        <motion.div
          className={styles.popoverContent}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <span className={styles.popoverItem}>
              <Clock size={17} />
              <span>{formatDateChat(createdAt)}</span>
            </span>

            <Dropdown.Item asChild>
              <button
                type="button"
                onClick={handleCopy}
                className={clsx(styles.popoverItem)}
              >
                <Copy size={17} />
                <span>Copy</span>
              </button>
            </Dropdown.Item>

            <Dropdown.Item asChild>
              <button
                type="button"
                onClick={confirmationModal.openModal}
                className={clsx(
                  styles.popoverItem,
                  styles.popoverItemDestructive,
                )}
              >
                <Trash size={17} />
                <span>Delete</span>
              </button>
            </Dropdown.Item>
          </div>
          <Dropdown.Arrow
            width={25}
            height={10}
            className={styles.popoverArrow}
          />
        </motion.div>
      </Dropdown.Content>
    </Dropdown.Portal>
  );
};
