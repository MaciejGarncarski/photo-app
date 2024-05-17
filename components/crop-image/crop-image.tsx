import { FloppyDisk, Hand, Image, Mouse } from '@phosphor-icons/react';
import { useState } from 'react';
import Cropper from 'react-easy-crop';

import { useIsTabletOrMobile } from '@/hooks/use-is-tablet-or-mobile';
import { useModal } from '@/hooks/use-modal';

import { AspectRatioButtons } from '@/components/buttons/aspect-ratio-buttons/aspect-ratio-buttons';
import { Button } from '@/components/buttons/button/button';
import { useCropImage } from '@/components/crop-image/use-crop-image';
import { DropZone } from '@/components/drop-zone/drop-zone';
import { Loader } from '@/components/loader/loader';
import { ConfirmationDialog } from '@/components/modals/confirmation-dialog/confirmation-dialog';
import type { FinalImages } from '@/components/pages/create-post/create-post-schema';

import styles from './crop-image.module.scss';

type Props = {
  setFinalImages: (final: FinalImages) => void;
  finalImages: FinalImages;
  isAvatarCrop?: boolean;
};

export const CropImage = ({
  setFinalImages,
  finalImages,
  isAvatarCrop,
}: Props) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const { openModal, isModalOpen, closeModal } = useModal();
  const { isTabletOrMobile } = useIsTabletOrMobile();

  const resetImgSrc = () => setImgSrc(null);

  const {
    aspect,
    setAspect,
    setZoom,
    zoom,
    crop,
    setCrop,
    onCropComplete,
    isCropping,
    saveCrop,
  } = useCropImage({ finalImages, imgSrc, resetImgSrc, setFinalImages });

  const handleSelectOtherImage = () => {
    resetImgSrc();
    closeModal();
  };

  if (isCropping) {
    return <Loader size="big" color="accent" />;
  }

  if (!imgSrc) {
    return <DropZone setImgSrc={setImgSrc} />;
  }

  return (
    <>
      <section className={styles.addPhoto}>
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
          {isTabletOrMobile ? <Hand /> : <Mouse />}
          <span>
            {isTabletOrMobile ? 'Pinch' : 'Use scroll to'} to zoom in your
            picture
          </span>
        </p>
        {!isAvatarCrop && (
          <AspectRatioButtons aspect={aspect} setAspect={setAspect} />
        )}
        <section className={styles.saveOrAnotherImage}>
          <div className={styles.buttons}>
            <Button type="button" variant="primary" onClick={saveCrop}>
              {isTabletOrMobile ? 'Save crop' : 'Save cropped image'}
              <FloppyDisk />
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={!imgSrc}
              onClick={openModal}
            >
              Select another
              {isTabletOrMobile ? '' : ' image'}
              {!isTabletOrMobile && <Image />}
            </Button>
          </div>
        </section>
      </section>
      {isModalOpen && (
        <ConfirmationDialog
          isVisible={isModalOpen}
          text="Do you want to select another image?"
          closeModal={closeModal}
        >
          <Button
            variant="destructive"
            onClick={handleSelectOtherImage}
            disabled={!imgSrc}
          >
            Confirm
          </Button>

          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </ConfirmationDialog>
      )}
    </>
  );
};
