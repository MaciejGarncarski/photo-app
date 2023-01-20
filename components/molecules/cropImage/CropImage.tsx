/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import { Crop, PixelCrop } from 'react-image-crop';
import ReactCrop from 'react-image-crop';

import { centerAspectCrop } from '@/utils/centerAspectCrop';
import { handleDropImage } from '@/utils/handleDropImage';

import 'react-image-crop/src/ReactCrop.scss';
import styles from './cropImage.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { DropZone } from '@/components/atoms/dropZone/DropZone';
import { Heading } from '@/components/atoms/heading/Heading';
import { useCreateImg } from '@/components/pages/createPost/useCreateImg';

type CropImageProps = {
  aspectRatio: number;
  setFinalImg: (img: Blob | null) => void;
};

export type ImageCropErrors =
  | null
  | 'DIMENSIONS'
  | 'FILE_SIZE'
  | 'INVALID_TYPE'
  | 'NO_IMAGE_DETECTED'
  | 'TOO_MANY_IMAGES';

export const CropImage = ({ setFinalImg, aspectRatio }: CropImageProps) => {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [error, setError] = useState<ImageCropErrors>(null);

  useCreateImg({ completedCrop, imgRef, previewCanvasRef, setFinalImg, isError: Boolean(error) });

  const handleImage = (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files) {
      setError('NO_IMAGE_DETECTED');
      return;
    }

    if (changeEv.target.files.length > 0) {
      setCrop(undefined);
      const file = changeEv.target.files[0];
      handleDropImage({ file, setError, setImgSrc });
    }
  };

  const chooseDiffrentImage = () => {
    setImgSrc('');
    setError(null);
    setFinalImg(null);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (aspectRatio) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspectRatio));
    }
  };

  const onImageError = () => {
    setError('NO_IMAGE_DETECTED');
    setFinalImg(null);
    setImgSrc('');
  };

  if (!imgSrc || error) {
    return <DropZone handleImage={handleImage} error={error} setImgSrc={setImgSrc} setError={setError} />;
  }

  return (
    <>
      <div className={styles.cropContainer}>
        <Heading tag="h2">Crop your image</Heading>
        <Button variant="secondary" onClick={chooseDiffrentImage}>
          Choose diffrent image
        </Button>
      </div>
      <canvas style={{ display: 'none' }} ref={previewCanvasRef}></canvas>
      <ReactCrop
        key={aspectRatio}
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={aspectRatio}
        className={styles.reactCrop}
      >
        <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} onError={onImageError} />
      </ReactCrop>
    </>
  );
};
