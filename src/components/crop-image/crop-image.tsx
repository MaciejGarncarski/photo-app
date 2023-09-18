import { File, Hand, Mouse } from '@phosphor-icons/react';
import { useState } from 'react';
import Cropper from 'react-easy-crop';

import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { useModal } from '@/src/hooks/use-modal';

import { AspectRatioButtons } from '@/src/components/buttons/aspect-ratio-buttons/aspect-ratio-buttons';
import { Button } from '@/src/components/buttons/button/button';
import { useCropImage } from '@/src/components/crop-image/use-crop-image';
import { useSaveCrop } from '@/src/components/crop-image/use-save-crop';
import { DropZone } from '@/src/components/drop-zone/drop-zone';
import { Loader } from '@/src/components/loader/loader';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';
import { FinalImages } from '@/src/components/pages/create-post/types';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './crop-image.module.scss';

type Props = {
  setFinalImages: (final: FinalImages) => void;
  finalImages: FinalImages;
};

export const CropImage = ({ setFinalImages, finalImages }: Props) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const {
    aspect,
    setAspect,
    setZoom,
    zoom,
    crop,
    setCrop,
    cropAreaPixels,
    onCropComplete,
  } = useCropImage();
  const { openModal, isModalOpen, closeModal } = useModal();
  const { isMobile } = useIsMobile();

  const resetImgSrc = () => setImgSrc(null);
  const { isCropping, saveCrop } = useSaveCrop({
    cropAreaPixels,
    finalImages,
    imgSrc,
    resetImgSrc,
    setFinalImages,
  });

  if (isCropping) {
    return <Loader size="small" color="accent" />;
  }

  if (!imgSrc) {
    return <DropZone setImgSrc={setImgSrc} />;
  }

  return (
    <>
      <section className={styles.addPhoto}>
        <Heading size="medium" tag="h2">
          Crop image
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
            classes={{ mediaClassName: styles.cropImage }}
          />
        </div>
        <p className={styles.info}>
          {isMobile ? <Hand /> : <Mouse />}
          <span>
            {isMobile ? 'Pinch' : 'Use scroll to'} to zoom in your picture
          </span>
        </p>
        <AspectRatioButtons aspect={aspect} setAspect={setAspect} />
        <section className={styles.saveOrAnotherImage}>
          <Heading size="small" tag="h3">
            Save or select another image
          </Heading>
          <div className={styles.buttons}>
            <Button type="button" variant="primary" onClick={saveCrop}>
              Save crop
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={!imgSrc}
              onClick={openModal}
            >
              Select diffrent image
            </Button>
          </div>
        </section>
      </section>
      {isModalOpen && (
        <ConfirmationDialog
          isVisible={isModalOpen}
          text="Do you want to select diffrent image?"
          closeModal={closeModal}
        >
          <Button
            variant="destructive"
            onClick={resetImgSrc}
            disabled={!imgSrc}
          >
            Select diffrent image
            <File />
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </ConfirmationDialog>
      )}
    </>
  );
};
