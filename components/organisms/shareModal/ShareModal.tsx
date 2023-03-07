import { IconCheck, IconCopy } from '@tabler/icons';
import { useState } from 'react';

import { ListModal } from '@/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/components/organisms/listModal/ListModalItem';

type PropsTypes = {
  close: () => void;
  textToCopy: string;
};

export const ShareModal = ({ close, textToCopy }: PropsTypes) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  return (
    <ListModal close={close} headingText="Share post">
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
