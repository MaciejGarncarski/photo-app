/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';

import { centerAspectCrop } from '@/utils/centerAspectCrop';
import { handleDropImage } from '@/utils/handleDropImage';

import styles from './cropImage.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { CropError } from '@/components/atoms/cropError/CropError';
import { DropZone } from '@/components/atoms/dropZone/DropZone';
import { AspectRatioButtons } from '@/components/molecules/aspectRatioButtons/AspectRatioButtons';
import { useCreateImg } from '@/components/pages/createPost/useCreateImg';

type CropImageProps = {
  setFinalImg: (img: Blob | null) => void;
};

export type ImageErrors =
  | null
  | 'DIMENSIONS'
  | 'FILE_SIZE'
  | 'INVALID_TYPE'
  | 'NO_IMAGE_DETECTED'
  | 'TOO_MANY_IMAGES';

export const CropImage = ({ setFinalImg }: CropImageProps) => {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(1);
  const [error, setError] = useState<ImageErrors>(null);

  useCreateImg({ completedCrop, imgRef, previewCanvasRef, setFinalImg });

  const handleImage = (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (changeEv.target.files && changeEv.target.files.length > 0) {
      setCrop(undefined);
      const file = changeEv.target.files[0];
      handleDropImage({ file, setError, setImgSrc });
    }
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const onImageError = () => {
    setError('NO_IMAGE_DETECTED');
    setFinalImg(null);
    setImgSrc('');
  };

  const chooseDiffrentImage = () => {
    setImgSrc('');
    setError(null);
    setFinalImg(null);
  };

  if (!imgSrc || error) {
    return (
      <>
        <DropZone handleImage={handleImage} setImgSrc={setImgSrc} setError={setError} />
        <CropError errorType={error} />
      </>
    );
  }

  return (
    <>
      <canvas style={{ display: 'none' }} ref={previewCanvasRef}></canvas>
      <AspectRatioButtons aspect={aspect} setAspect={setAspect} />
      <CreatePostItemContainer>
        <div className={styles.cropContainer}>
          <h3 className='heading'>Crop your image</h3>
          <Button variant='secondary' onClick={chooseDiffrentImage}>
            Choose diffrent image
          </Button>
        </div>
        <ReactCrop
          key={aspect}
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          className={styles.reactCrop}
        >
          <img
            ref={imgRef}
            alt='Crop me'
            src={imgSrc}
            onLoad={onImageLoad}
            onError={onImageError}
          />
        </ReactCrop>
      </CreatePostItemContainer>
    </>
  );
};
