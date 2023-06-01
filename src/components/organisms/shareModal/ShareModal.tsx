import { IconCheck, IconCopy } from '@tabler/icons-react';

import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';
import { useShareModal } from '@/src/components/organisms/shareModal/useShareModal';

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
