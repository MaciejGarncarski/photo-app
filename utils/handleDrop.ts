import { handleDropImage } from '@/utils/handleDropImage';

import { ImageErrors } from '@/components/molecules/cropImage/CropImage';

type HandleDrop = {
  files?: Array<File>;
  setImgSrc: (src: string) => void;
  setError: (error: ImageErrors | null) => void;
  setFileName: (err: string | null) => void;
};

export const handleDrop = ({ setError, setFileName, setImgSrc, files }: HandleDrop) => {
  if (!files) {
    setError('NO_IMAGE_DETECTED');
    return 'NO_IMAGE_DETECTED';
  }
  const firstFile = files[0];

  if (files.length > 1) {
    setError('TOO_MANY_IMAGES');
    return 'TOO_MANY_IMAGES';
  }

  handleDropImage({ file: firstFile, setError, setFileName, setImgSrc });
};
