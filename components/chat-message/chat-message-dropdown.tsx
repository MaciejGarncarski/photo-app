import { Clock, Copy, Trash } from '@phosphor-icons/react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { toast } from 'sonner';

import { formatDateFull } from '@/utils/format-date-full';

import { DropdownContent } from '@/components/dropdown/dropdown-content/dropdown-content';
import { DropdownItem } from '@/components/dropdown/dropdown-item/dropdown-item';

type Props = {
  createdAt: string;
  messageText: string;
  closeModal: () => void;
  isReceiver: boolean;
  confirmationModal: {
    isModalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
  };
};

export const ChatMessageDropdown = ({
  createdAt,
  confirmationModal,
  messageText,
  closeModal,
  isReceiver,
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
    <Dropdown.Portal>
      <DropdownContent side="top" sideOffset={0}>
        <DropdownItem variant="primary">
          <Clock size={17} />
          <span>{formatDateFull(createdAt, { fullMonth: true })}</span>
        </DropdownItem>
        <DropdownItem onSelect={handleCopy} variant="primary">
          <Copy size={17} />
          <span>Copy</span>
        </DropdownItem>

        {isReceiver ? null : (
          <DropdownItem
            onSelect={confirmationModal.openModal}
            variant="destructive"
          >
            <Trash size={17} />
            <span>Delete</span>
          </DropdownItem>
        )}
      </DropdownContent>
    </Dropdown.Portal>
  );
};
