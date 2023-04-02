import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useState } from 'react';

import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';

type PropsTypes = {
  close: () => void;
  textToCopy: string;
  isVisible: boolean;
};

export const ShareModal = ({ close, textToCopy, isVisible }: PropsTypes) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  return (
    <ListModal isVisible={isVisible} close={close} headingText="Share post">
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
