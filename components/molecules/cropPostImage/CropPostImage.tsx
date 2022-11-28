/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';

import { centerAspectCrop } from '@/utils/centerAspectCrop';

import styles from './cropPostImage.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CropError } from '@/components/atoms/cropError/CropError';
import { DropZone } from '@/components/atoms/dropZone/DropZone';
import { useCreateImg } from '@/components/pages/createPost/useCreateImg';

type ButtonData = {
  text: string;
  aspectRatio: number;
};

type CropPostImageProps = {
  setFinalImg: (img: Blob | null) => void;
};

export type ImageErrors = null | 'DIMENSIONS' | 'FILE_SIZE';

const buttonData: Array<ButtonData> = [
  { text: 'Normal', aspectRatio: 1 },
  { text: 'Portrait', aspectRatio: 4 / 5 },
  { text: 'Landscape', aspectRatio: 1.91 / 1 },
];

export const CropPostImage = ({ setFinalImg }: CropPostImageProps) => {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [error, setError] = useState<ImageErrors>(null);

  useCreateImg({ completedCrop, imgRef, previewCanvasRef, setFinalImg });

  const handleImage = (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (changeEv.target.files && changeEv.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(changeEv.target.files[0]);
    }
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const chooseDiffrentImage = () => {
    setImgSrc('');
    setFinalImg(null);
  };

  return (
    <>
      <canvas style={{ display: 'none' }} ref={previewCanvasRef}></canvas>
      {!imgSrc && <DropZone handleImage={handleImage} setImgSrc={setImgSrc} setError={setError} />}
      {Boolean(imgSrc) && (
        <>
          <ReactCrop
            className={styles.reactCrop}
            key={aspect}
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img ref={imgRef} alt='Crop me' src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>

          <div className={styles.buttonCenter}>
            <Button variant='secondary' onClick={chooseDiffrentImage}>
              Choose diffrent image
            </Button>
          </div>
          <div className={styles.aspectRatioButtons}>
            {buttonData.map(({ text, aspectRatio }) => {
              return (
                <Button onClick={() => setAspect(aspectRatio)} key={aspectRatio}>
                  {text}
                </Button>
              );
            })}
          </div>
        </>
      )}

      <CropError errorType={error} />
    </>
  );
};
