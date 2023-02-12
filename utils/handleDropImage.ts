import { ImageCropErrors } from '@/components/molecules/cropImage/CropImage';

type HandleDropImage = {
  file: File;
  setError: (err: ImageCropErrors) => void;
  setImgSrc: (err: string | null) => void;
};

export const IMAGE_MIN_SIZE = 150;
export const IMAGE_MAX_FILE_SIZE = 2_500_000;

export const handleDropImage = ({ file, setError, setImgSrc }: HandleDropImage) => {
  const reader = new FileReader();

  setError(null);
  const fileType = file.type.split('/');

  if (file.size > IMAGE_MAX_FILE_SIZE) {
    setError('FILE_SIZE');
    return;
  }

  if (!fileType.includes('image')) {
    setError('INVALID_TYPE');
    return;
  }

  reader.addEventListener('load', async () => {
    const image = new Image();

    try {
      await new Promise<void>((resolve, reject) => {
        image.onload = () => {
          const { height, width } = image;
          if (width < IMAGE_MIN_SIZE || height < IMAGE_MIN_SIZE) {
            setError('DIMENSIONS');
            reject(new Error('DIMENSIONS'));
          }
        };
        resolve();
      });
      image.src = URL.createObjectURL(file);
      setError(null);
      setImgSrc(reader.result?.toString() || null);
    } catch (error) {
      setImgSrc(null);
      setError('INVALID_TYPE');
    }
  });

  reader.readAsDataURL(file);
};
