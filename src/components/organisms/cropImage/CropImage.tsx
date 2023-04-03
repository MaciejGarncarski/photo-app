/* eslint-disable @next/next/no-img-element */
import { IconHandFinger, IconMouse } from '@tabler/icons-react';
import { useState } from 'react';
import Cropper from 'react-easy-crop';

import { useIsCropping } from '@/src/hooks/useIsCropping';
import { useScreenWidth } from '@/src/hooks/useScreenWidth';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { CreatePostItemContainer } from '@/src/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/src/components/atoms/heading/Heading';

import { AspectRatioButtons } from '@/src/components/molecules/aspectRatioButtons/AspectRatioButtons';

import { useConfirmation } from '@/src/components/organisms/cropImage/useConfirmation';
import { useCropImage } from '@/src/components/organisms/cropImage/useCropImage';
import { DropZone } from '@/src/components/organisms/dropZone/DropZone';
import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import styles from './cropImage.module.scss';

export const CropImage = () => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const { isMobile } = useScreenWidth();
  const { isCropping } = useIsCropping();
  const { DiffrentImageConfirmation, openModal } = useConfirmation();

  const {
    saveCrop,
    zoom,
    setZoom,
    isIdle,
    error,
    setError,
    imgSrc,
    setImgSrc,
    setCropArea,
    cropArea,
    onChange,
    onCropComplete,
  } = useCropImage();

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
          zoom={zoom}
          onZoomChange={setZoom}
          crop={cropArea}
          onCropChange={setCropArea}
          onCropComplete={onCropComplete}
        />
      </div>
      <p className={styles.info}>
        {isMobile ? <IconHandFinger /> : <IconMouse />}
        <span>{isMobile ? 'Pinch' : 'Use scroll to'} to zoom in your picture</span>
      </p>
      {isCropping && <AspectRatioButtons aspect={aspectRatio} setAspect={setAspectRatio} />}
      <div className={styles.buttons}>
        <Button type="button" onClick={openModal} variant="secondary">
          Select diffrent image
        </Button>
        <Button type="button" onClick={saveCrop} variant="primary">
          Save crop
        </Button>
      </div>
      <DiffrentImageConfirmation />
    </CreatePostItemContainer>
  );
};
