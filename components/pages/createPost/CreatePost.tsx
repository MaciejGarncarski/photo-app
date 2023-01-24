/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPhotoPlus } from '@tabler/icons';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './createPost.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { AspectRatioButtons } from '@/components/molecules/aspectRatioButtons/AspectRatioButtons';
import { ConfirmationModal } from '@/components/molecules/confirmationModal/ConfirmationModal';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { useSendNewPost } from '@/components/pages/createPost/useSendNewPost';

const PostDetailsSchema = z.object({
  description: z.string().max(200, { message: 'Maximum characters exceeded' }),
});

type PostDetails = z.infer<typeof PostDetailsSchema>;

type FinalImage = {
  id: number;
  file: Blob | null;
};

export type FinalImages = Array<FinalImage | undefined>;

type ImgSrcs = Array<
  | {
      id: number;
      src: string;
    }
  | undefined
>;

export const CreatePost = () => {
  const [isCanceling, setIsCanceling] = useState<boolean>(false);
  const [isCropping, setIsCropping] = useState<boolean>(false);

  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [finalImages, setFinalImages] = useState<FinalImages>([]);

  const [finalImagesBase64, setFinalImagesBase64] = useState<ImgSrcs>();

  useEffect(() => {
    const convertedFiles = finalImages.map((finalImg) => {
      if (finalImg?.file) {
        const img = URL.createObjectURL(finalImg?.file);
        return {
          id: finalImg?.id,
          src: img,
        };
      }
    });
    setFinalImagesBase64(convertedFiles);
  }, [finalImages]);

  const defaultValues: PostDetails = {
    description: '',
  };

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<PostDetails>({
    resolver: zodResolver(PostDetailsSchema),
    defaultValues,
  });

  const { mutate, isLoading } = useSendNewPost();

  const onSubmit: SubmitHandler<PostDetails> = ({ description }) => {
    if (!finalImages) {
      return;
    }

    mutate({ description, images: finalImages });
  };

  const handleRemoveImage = (id: number) => {
    const filteredState = finalImages.filter((finalImg) => {
      return finalImg?.id !== id;
    });

    setFinalImages(filteredState);
  };

  if (isLoading) {
    return (
      <section className={styles.loadingContainer} aria-labelledby="Upload loading">
        <Heading tag="h2" variant="center">
          Uploading your post
        </Heading>
        <Loading />
      </section>
    );
  }

  const isEmpty = finalImages.length < 1;
  const isFull = finalImages.length === 3;
  const emptyImagesLength = 3 - finalImages.length;

  return (
    <section aria-labelledby="Create new post" className={styles.createPost}>
      <NextSeo title="Create new post" />
      {isCropping && <AspectRatioButtons aspect={aspectRatio} setAspect={setAspectRatio} />}
      {finalImages.length < 3 && !isFull && (
        <div className={styles.addPhoto}>
          <CreatePostItemContainer>
            <CropImage
              isCropping={isCropping}
              setIsCropping={setIsCropping}
              setFinalImages={setFinalImages}
              finalImages={finalImages}
              aspectRatio={aspectRatio}
            />
          </CreatePostItemContainer>
        </div>
      )}
      {!isEmpty && finalImagesBase64 && (
        <>
          <Heading tag="h2">Images in post</Heading>
          <div className={styles.previewContainer}>
            {finalImagesBase64.map((finalImage) => {
              if (finalImage?.src) {
                return (
                  <button
                    onClick={() => handleRemoveImage(finalImage.id)}
                    key={finalImage.id}
                    className={styles.previewButton}
                    type="button"
                  >
                    {finalImagesBase64 && (
                      <Image
                        className={styles.imgPreview}
                        src={finalImage.src}
                        alt="image preview"
                        width={200}
                        height={200}
                      />
                    )}
                    <span className="visually-hidden">remove image</span>
                  </button>
                );
              }

              return null;
            })}

            {Array.from({ length: emptyImagesLength }, (_, el) => el).map((id) => {
              return (
                <button key={id} disabled type="button" className={styles.emptySpace}>
                  <IconPhotoPlus />
                  <span className="visually-hidden">empty space for image</span>
                </button>
              );
            })}
          </div>
        </>
      )}
      {!isEmpty && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CreatePostItemContainer>
            <Heading tag="h2">Info about post</Heading>
            <TextArea label="description" {...register('description')} />
            <div className={styles.actionButtons}>
              <Button variant="secondary" onClick={() => setIsCanceling(true)}>
                Cancel
              </Button>
              <Button type="submit" disabled={Boolean(!dirtyFields.description || !finalImages)}>
                Complete
              </Button>
            </div>
          </CreatePostItemContainer>
        </form>
      )}

      <AnimatePresence>
        {isCanceling && (
          <ConfirmationModal confirmText="Go back to home?" setIsOpen={setIsCanceling} onConfirm={() => null} />
        )}
      </AnimatePresence>
    </section>
  );
};
