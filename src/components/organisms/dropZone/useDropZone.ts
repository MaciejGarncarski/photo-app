import { ChangeEvent, DragEvent, useRef, useState } from 'react';

import { handleDropImage } from '@/src/utils/handleDropImage';

import { ChangeError } from '@/src/components/organisms/dropZone/useDropError';

type ArgumentsTypes = {
  changeError: ChangeError;
  setImgSrc: (image: string | null) => void;
};

export const useDropZone = ({ changeError, setImgSrc }: ArgumentsTypes) => {
  const [isActive, setIsActive] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { errorNoImage } = changeError;

  const onChange = (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files) {
      errorNoImage();
      return;
    }

    if (changeEv.target.files.length > 0) {
      setIsUploadingImage(true);
      handleDropImage({ file: changeEv.target.files[0], changeError, setImgSrc });
      setIsUploadingImage(false);
    }
  };

  const active = (dragEv: DragEvent<HTMLDivElement>) => {
    dragEv.preventDefault();
    setIsActive(true);
  };

  const inactive = (dragEv: DragEvent<HTMLDivElement>) => {
    dragEv.preventDefault();
    setIsActive(false);
  };

  const onDrop = (dropEv: DragEvent<HTMLDivElement>) => {
    inactive(dropEv);
    const {
      dataTransfer: { files },
    } = dropEv;

    const firstFile = files[0];

    if (!files || !firstFile) {
      return changeError.errorNoImage();
    }

    if (files.length > 1) {
      return changeError.errorTooManyImage();
    }

    setIsUploadingImage(true);
    handleDropImage({ file: firstFile, changeError, setImgSrc });
  };

  return { active, inactive, onDrop, isActive, inputRef, isUploadingImage, onChange };
};
