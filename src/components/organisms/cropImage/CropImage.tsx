import { IconHandFinger, IconMouse } from '@tabler/icons-react';
import { useState } from 'react';
import Cropper from 'react-easy-crop';

import { useIsMobile } from '@/src/hooks/useIsMobile';
import { useModal } from '@/src/hooks/useModal';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { Heading } from '@/src/components/atoms/heading/Heading';

import { AspectRatioButtons } from '@/src/components/molecules/aspectRatioButtons/AspectRatioButtons';
import { Loader } from '@/src/components/molecules/loader/Loader';

import { useCropImage } from '@/src/components/organisms/cropImage/useCropImage';
import { useSaveCrop } from '@/src/components/organisms/cropImage/useSaveCrop';
import { DropZone } from '@/src/components/organisms/dropZone/DropZone';

import { FinalImages } from '@/src/components/pages/createPost/types';

import styles from './CropImage.module.scss';

import { ConfirmationAlert } from '../confirmationAlert/ConfirmationAlert';

type Props = {
  setFinalImages: (final: FinalImages) => void;
  finalImages: FinalImages;
};

export const CropImage = ({ setFinalImages, finalImages }: Props) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const { aspect, setAspect, setZoom, zoom, crop, setCrop, cropAreaPixels, onCropComplete } = useCropImage();
  const { openModal, isModalOpen, closeModal } = useModal();
  const { isMobile } = useIsMobile();

  const resetImgSrc = () => setImgSrc(null);
  const { isCropping, saveCrop } = useSaveCrop({ cropAreaPixels, finalImages, imgSrc, resetImgSrc, setFinalImages });

  if (isCropping) {
    return <Loader size="normal" color="blue" />;
  }

  if (!imgSrc) {
    return <DropZone setImgSrc={setImgSrc} />;
  }

  return (
    <>
      <section className={styles.addPhoto}>
        <Heading size="medium" tag="h2">
          Crop your image
        </Heading>

        <div className={styles.cropContainer}>
          <Cropper
            image={imgSrc}
            zoom={zoom}
            aspect={aspect}
            crop={crop}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
          />
        </div>
        <p className={styles.info}>
          {isMobile ? <IconHandFinger /> : <IconMouse />}
          <span>{isMobile ? 'Pinch' : 'Use scroll to'} to zoom in your picture</span>
        </p>
        <AspectRatioButtons aspect={aspect} setAspect={setAspect} />
        <div className={styles.buttons}>
          <Button type="button" variant="primary" onClick={saveCrop}>
            Save crop
          </Button>
          <Button type="button" variant="secondary" disabled={!imgSrc} onClick={openModal}>
            Select diffrent image
          </Button>
        </div>
      </section>
      {isModalOpen && (
        <ConfirmationAlert
          isVisible={isModalOpen}
          headingText="Select diffrent image?"
          closeModal={closeModal}
          onConfirm={resetImgSrc}
        />
      )}
    </>
  );
};
