/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import { Crop, PixelCrop } from 'react-image-crop';
import ReactCrop from 'react-image-crop';

import { centerAspectCrop } from '@/utils/centerAspectCrop';
import { convertToBlob } from '@/utils/convertToBlob';
import { handleDropImage } from '@/utils/handleDropImage';

import { Button } from '@/components/atoms/button/Button';
import { DropZone } from '@/components/atoms/dropZone/DropZone';
import { Heading } from '@/components/atoms/heading/Heading';
import { LoadingHeading } from '@/components/atoms/loadingHeading/LoadingHeading';
import { FinalImages } from '@/components/pages/createPost/CreatePost';

import 'react-image-crop/src/ReactCrop.scss';
import styles from './cropImage.module.scss';

type PropsTypes = {
  aspectRatio: number;
  finalImages: FinalImages;
  isCropping: boolean;
  setIsCropping: (isAdding: boolean) => void;
  setFinalImages: (finalImages: FinalImages) => void;
};

export type ImageCropErrors =
  | null
  | 'DIMENSIONS'
  | 'FILE_SIZE'
  | 'INVALID_TYPE'
  | 'NO_IMAGE_DETECTED'
  | 'TOO_MANY_IMAGES';

export const CropImage = ({ aspectRatio, finalImages, setIsCropping, setFinalImages }: PropsTypes) => {
  const [crop, setCrop] = useState<Crop>();
  const [cropCompleted, setCropCompleted] = useState<PixelCrop>();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState<ImageCropErrors>(null);
  const [isIdle, setIsIdle] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (!aspectRatio) {
      return;
    }
    const { width, height } = e.currentTarget;
    setIsCropping(true);
    setCrop(centerAspectCrop(width, height, aspectRatio));
  };

  const resetState = () => {
    setImgSrc(null);
    setCrop(undefined);
    setError(null);
    setIsCropping(false);
  };

  const saveCrop = async () => {
    setIsIdle(true);
    if (imgRef.current && cropCompleted) {
      const { blob } = await convertToBlob(imgRef.current, cropCompleted);
      setFinalImages([
        ...finalImages,
        {
          file: blob,
          id: finalImages.length,
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
      <Button type="button" onClick={resetState} variant="secondary" className={styles.button}>
        Select diffrent image
      </Button>
      <ReactCrop
        key={aspectRatio}
        crop={crop}
        onChange={(_, percentCrop) => {
          setCrop(percentCrop);
        }}
        aspect={aspectRatio}
        className={styles.reactCrop}
        onComplete={(c) => setCropCompleted(c)}
      >
        <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
      </ReactCrop>
      <Button type="button" className={styles.button} onClick={saveCrop}>
        Save crop
      </Button>
    </>
  );
};
