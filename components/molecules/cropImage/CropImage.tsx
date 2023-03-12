/* eslint-disable @next/next/no-img-element */
import Cropper from 'react-easy-crop';

import { Button } from '@/components/atoms/buttons/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { LoadingHeading } from '@/components/atoms/loadingHeading/LoadingHeading';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { useCropImage } from '@/components/molecules/cropImage/useCropImage';
import { DropZone } from '@/components/molecules/dropZone/DropZone';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { FinalImages } from '@/components/pages/createPost/types';

import styles from './cropImage.module.scss';

type PropsTypes = {
  aspectRatio: number;
  finalImages: FinalImages;
  setFinalImages: (finalImages: FinalImages) => void;
};

export const CropImage = ({ aspectRatio, finalImages, setFinalImages }: PropsTypes) => {
  const { open, close, modalOpen } = useModal();

  const {
    onCropComplete,
    saveCrop,
    imgSrc,
    isIdle,
    zoom,
    crop,
    error,
    setCrop,
    setZoom,
    setError,
    setImgSrc,
    onChange,
    resetState,
  } = useCropImage({
    finalImages,
    setFinalImages,
  });

  const onConfirm = () => {
    close();
    resetState();
  };

  if (!imgSrc || error) {
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
        {modalOpen && <ConfirmationAlert headingText="Select diffrent image?" close={close} onConfirm={onConfirm} />}
      </ModalContainer>
    </>
  );
};
