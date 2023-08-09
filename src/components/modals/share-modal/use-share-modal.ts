import { useState } from 'react';

type Arguments = {
  textToCopy: string;
};

export const useShareModal = ({ textToCopy }: Arguments) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  return { isCopied, handleCopy };
};
