/* eslint-disable @next/next/no-img-element */
import { IconHandFinger, IconMouse } from '@tabler/icons-react';
import { useState } from 'react';
import Cropper from 'react-easy-crop';

import { useIsCropping } from '@/hooks/useIsCropping';
import { useScreenWidth } from '@/hooks/useScreenWidth';

import { Button } from '@/components/atoms/buttons/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';
import { TextWithLoader } from '@/components/atoms/textWithLoader/TextWithLoader';
import { AspectRatioButtons } from '@/components/molecules/aspectRatioButtons/AspectRatioButtons';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { ImageCropErrors, useCropImage } from '@/components/molecules/cropImage/useCropImage';
import { DropZone } from '@/components/molecules/dropZone/DropZone';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { FinalImages } from '@/components/pages/createPost/types';

import styles from './cropImage.module.scss';

type PropsTypes = {
  finalImages: FinalImages;
  setFinalImages: (finalImages: FinalImages) => void;
};

export const CropImage = ({ finalImages, setFinalImages }: PropsTypes) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState<ImageCropErrors>(null);
  const [isIdle, setIsIdle] = useState<boolean>(false);

  const { open, close, modalOpen } = useModal();
  const { isMobile } = useScreenWidth();
  const { isCropping, setIsCropping } = useIsCropping();

  const resetState = () => {
    setImgSrc(null);
    setCrop({ x: 0, y: 0 });
    setError(null);
    setIsCropping(false);
  };

  const { onCropComplete, saveCrop, onChange } = useCropImage({
    finalImages,
    setFinalImages,
    resetState,
    setError,
    imgSrc,
    setImgSrc,
    setIsIdle,
  });

  const onConfirm = () => {
    close();
    resetState();
  };

  if (!imgSrc || error) {
    return <DropZone onChange={onChange} error={error} setImgSrc={setImgSrc} setError={setError} />;
  }

  if (isIdle) {
    return <TextWithLoader text="Your image is being cropped, be patient." />;
  }

  return (
    <CreatePostItemContainer>
      <Heading tag="h2" size="medium">
        Crop your image
      </Heading>
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
      <p className={styles.info}>
        {isMobile ? <IconHandFinger /> : <IconMouse />}
        <span>{isMobile ? 'Pinch' : 'Use scroll to'} to zoom in your picture</span>
      </p>
      {isCropping && <AspectRatioButtons aspect={aspectRatio} setAspect={setAspectRatio} />}
      <div className={styles.buttons}>
        <Button type="button" onClick={open} variant="secondary">
          Select diffrent image
        </Button>
        <Button type="button" onClick={saveCrop} variant="primary">
          Save crop
        </Button>
      </div>

      <ModalContainer>
        {modalOpen && <ConfirmationAlert headingText="Select diffrent image?" close={close} onConfirm={onConfirm} />}
      </ModalContainer>
    </CreatePostItemContainer>
  );
};
