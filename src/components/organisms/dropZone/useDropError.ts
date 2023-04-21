import { useState } from 'react';

import { DropZoneErrors } from '@/src/components/pages/createPost/types';

export type ChangeError = {
  errorDimensions: () => void;
  errorFileSize: () => void;
  errorTooManyImage: () => void;
  errorInvalidType: () => void;
  errorNoImage: () => void;
  resetError: () => void;
};

export const useDropError = () => {
  const [error, setError] = useState<DropZoneErrors>();

  const errorDimensions = () => setError('DIMENSIONS');
  const errorFileSize = () => setError('FILE_SIZE');
  const errorTooManyImage = () => setError('TOO_MANY_IMAGES');
  const errorNoImage = () => setError('NO_IMAGE_DETECTED');
  const errorInvalidType = () => setError('INVALID_TYPE');
  const resetError = () => setError(null);

  const changeError = {
    errorDimensions,
    errorFileSize,
    errorTooManyImage,
    errorInvalidType,
    errorNoImage,
    resetError,
  } satisfies ChangeError;

  return { error, changeError };
};
