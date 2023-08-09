import { IconCheck, IconCopy } from '@tabler/icons-react';

import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal/list-modal-item';
import { useShareModal } from '@/src/components/modals/share-modal/use-share-modal';

type PropsTypes = {
  closeModal: () => void;
  textToCopy: string;
  isVisible: boolean;
};

export const ShareModal = ({
  closeModal,
  textToCopy,
  isVisible,
}: PropsTypes) => {
  const { isCopied, handleCopy } = useShareModal({ textToCopy });

  return (
    <ListModal
      isVisible={isVisible}
      closeModal={closeModal}
      headingText="Share post"
    >
      <ListModalItem
        type="button"
        icon={isCopied ? <IconCheck /> : <IconCopy />}
        disabled={isCopied}
        isLast
        onClick={handleCopy}
      >
        {isCopied ? 'Copied' : 'Copy link'}
      </ListModalItem>
    </ListModal>
  );
};
