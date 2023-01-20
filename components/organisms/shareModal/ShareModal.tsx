import { IconCheck, IconCopy } from '@tabler/icons';
import { useState } from 'react';

import { Modal } from '@/components/atoms/modal/Modal';

type PropsTypes = {
  setIsOpen: (isOpen: boolean) => void;
  textToCopy: string;
};

export const ShareModal = ({ setIsOpen, textToCopy }: PropsTypes) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  return (
    <Modal.Overlay setOpen={setIsOpen}>
      <Modal.Container>
        <Modal.Close onClose={() => setIsOpen(false)} />
        <Modal.List>
          <Modal.ListItem withButton disabled={isCopied} onClick={handleCopy} isFirst>
            {isCopied ? (
              <>
                <IconCheck /> Copied
              </>
            ) : (
              <>
                <IconCopy /> Copy link
              </>
            )}
          </Modal.ListItem>
        </Modal.List>
      </Modal.Container>
    </Modal.Overlay>
  );
};
