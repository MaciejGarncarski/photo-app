import { DropZoneErrors } from '@/components/pages/create-post/create-post-schema';

export const IMAGE_MIN_SIZE = 150;
export const IMAGE_MAX_FILE_SIZE = 5_500_000;
const SUPPORTED_FILE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];

type HandleDropImage = {
  file: File;
  setError: (error: DropZoneErrors) => void;
  setImgSrc: (err: string | null) => void;
};

export const handleDropImage = ({
  file,
  setError,
  setImgSrc,
}: HandleDropImage) => {
  const reader = new FileReader();
  const fileType = file.type.split('/');

  if (file.size > IMAGE_MAX_FILE_SIZE) {
    return setError('FILE_SIZE');
  }

  if (!SUPPORTED_FILE_TYPES.includes(fileType[1])) {
    return setError('INVALID_TYPE');
  }

  reader.addEventListener('load', () => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const { height, width } = image;
      if (width < IMAGE_MIN_SIZE || height < IMAGE_MIN_SIZE) {
        setImgSrc(null);
        return setError('DIMENSIONS');
      }
      setImgSrc(reader.result?.toString() || null);
    };
  });

  reader.readAsDataURL(file);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
