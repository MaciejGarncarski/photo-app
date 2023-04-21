import { ChangeError } from '@/src/components/organisms/dropZone/useDropError';

export const IMAGE_MIN_SIZE = 150;
export const IMAGE_MAX_FILE_SIZE = 5_500_000;
const SUPPORTED_FILE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];

type HandleDropImage = {
  file: File;
  changeError: ChangeError;
  setImgSrc: (err: string | null) => void;
};

export const handleDropImage = ({ file, changeError, setImgSrc }: HandleDropImage) => {
  const reader = new FileReader();
  const { resetError, errorInvalidType, errorFileSize, errorDimensions } = changeError;

  resetError();
  const fileType = file.type.split('/');

  if (file.size > IMAGE_MAX_FILE_SIZE) {
    return errorFileSize();
  }

  if (!SUPPORTED_FILE_TYPES.includes(fileType[1])) {
    return errorInvalidType();
  }

  reader.addEventListener('load', async () => {
    const image = new Image();

    await new Promise<void>((resolve, reject) => {
      image.onload = () => {
        const { height, width } = image;
        if (width < IMAGE_MIN_SIZE || height < IMAGE_MIN_SIZE) {
          setImgSrc(null);
          errorDimensions();
          reject();
        }
      };
      resolve();
    });
    image.src = URL.createObjectURL(file);
    resetError();
    setImgSrc(reader.result?.toString() || null);
  });

  reader.readAsDataURL(file);
};
