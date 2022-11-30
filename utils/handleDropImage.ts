import { ImageErrors } from '@/components/molecules/cropPostImage/CropPostImage';

type HandleDropImage = {
  file: File;
  setError: (err: ImageErrors) => void;
  setImgSrc: (err: string) => void;
  setFileName?: (err: string | null) => void;
};

export const IMAGE_MIN_SIZE = 500;
export const IMAGE_MAX_FILE_SIZE = 36_700_160;

export const handleDropImage = ({ file, setError, setFileName, setImgSrc }: HandleDropImage) => {
  const reader = new FileReader();
  if (file.size > IMAGE_MAX_FILE_SIZE) {
    setError('FILE_SIZE');
    return;
  }

  const fileType = file.type.split('/');
  if (!fileType.includes('image')) {
    setError('INVALID_TYPE');
    return;
  }

  reader.addEventListener('load', () => {
    const image = new Image();

    image.onload = () => {
      if (image.width < IMAGE_MIN_SIZE || image.height < IMAGE_MIN_SIZE) {
        setError('DIMENSIONS');
        return;
      }
      setImgSrc(reader.result?.toString() || '');
      if (setFileName) {
        setFileName(file.name);
      }
    };
    image.src = URL.createObjectURL(file);
  });
  reader.readAsDataURL(file);
  setError(null);
};
