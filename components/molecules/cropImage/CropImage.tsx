/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { v4 } from 'uuid';

import { convertToBlob } from '@/utils/convertToBlob';
import { handleDropImage } from '@/utils/handleDropImage';

import { Button } from '@/components/atoms/button/Button';
import { DropZone } from '@/components/atoms/dropZone/DropZone';
import { Heading } from '@/components/atoms/heading/Heading';
import { LoadingHeading } from '@/components/atoms/loadingHeading/LoadingHeading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { FinalImages } from '@/components/pages/createPost/CreatePost';

import styles from './cropImage.module.scss';

type PropsTypes = {
  aspectRatio: number;
  finalImages: FinalImages;
  setFinalImages: (finalImages: FinalImages) => void;
};

export type ImageCropErrors =
  | null
  | 'DIMENSIONS'
  | 'FILE_SIZE'
  | 'INVALID_TYPE'
  | 'NO_IMAGE_DETECTED'
  | 'TOO_MANY_IMAGES';

export const CropImage = ({ aspectRatio, finalImages, setFinalImages }: PropsTypes) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState<ImageCropErrors>(null);
  const [isIdle, setIsIdle] = useState<boolean>(false);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const { open, close, modalOpen } = useModal();

  const resetState = () => {
    setImgSrc(null);
    setCrop({ x: 0, y: 0 });
    setError(null);
  };

  const saveCrop = async () => {
    setIsIdle(true);
    if (croppedAreaPixels && imgSrc) {
      const blob = await convertToBlob(imgSrc, croppedAreaPixels);
      const imageId = v4();

      setFinalImages([
        ...finalImages,
        {
          file: blob,
          id: imageId,
        },
      ]);
      setIsIdle(false);
      resetState();
    }
  };

  if (!imgSrc || error) {
    const onChange = (changeEv: ChangeEvent<HTMLInputElement>) => {
      resetState();

      if (!changeEv.target.files) {
        setError('NO_IMAGE_DETECTED');
        return;
      }

      if (changeEv.target.files.length > 0) {
        handleDropImage({ file: changeEv.target.files[0], setError, setImgSrc });
      }
    };

    return <DropZone onChange={onChange} error={error} setImgSrc={setImgSrc} setError={setError} />;
  }

  if (isIdle) {
    return <LoadingHeading headingText="Your image is being cropped, be patient." />;
  }

  return (
    <>
      <Heading tag="h2">Crop your image</Heading>
      <div className={styles.cropContainer}>
        <Cropper
          image={imgSrc}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="button" onClick={open} variant="secondary" className={styles.button}>
          Select diffrent image
        </Button>
        <Button type="button" className={styles.button} onClick={saveCrop}>
          Save crop
        </Button>
      </div>

      <ModalContainer>
        {modalOpen && <ConfirmationAlert headingText="Select diffrent image?" close={close} onConfirm={resetState} />}
      </ModalContainer>
    </>
  );
};
