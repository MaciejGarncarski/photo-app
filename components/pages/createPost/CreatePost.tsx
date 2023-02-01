/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/atoms/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';
import { LoadingHeading } from '@/components/atoms/loadingHeading/LoadingHeading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { AspectRatioButtons } from '@/components/molecules/aspectRatioButtons/AspectRatioButtons';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { ImagesPreview } from '@/components/molecules/imagesPreview/ImagesPreview';
import { useConvertToBase64 } from '@/components/pages/createPost/useConvertToBase64';
import { useSendNewPost } from '@/components/pages/createPost/useSendNewPost';

import styles from './createPost.module.scss';

const PostDetailsSchema = z.object({
  description: z.string().max(200, { message: 'Maximum characters exceeded' }),
});

type PostDetails = z.infer<typeof PostDetailsSchema>;

type FinalImage = {
  id: number;
  file: Blob | null;
};
export type FinalImages = Array<FinalImage | undefined>;

export type ImagesBase64 = Array<
  | {
      id: number;
      src: string;
    }
  | undefined
>;

export const CreatePost = () => {
  const router = useRouter();

  const [isCropping, setIsCropping] = useState<boolean>(false);

  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const [finalImagesBase64, setFinalImagesBase64] = useState<ImagesBase64>();

  useConvertToBase64(finalImages, setFinalImagesBase64);

  const { open, close, modalOpen } = useModal();
  const { mutate, isLoading, isSuccess } = useSendNewPost();

  console.log(finalImages);

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<PostDetails>({
    resolver: zodResolver(PostDetailsSchema),
    defaultValues: {
      description: '',
    },
  });

  const onSubmit: SubmitHandler<PostDetails> = ({ description }) => {
    if (finalImages[0]?.file) {
      mutate(
        { description, images: finalImages },
        {
          onSuccess: async () => {
            await router.push('/');
          },
        },
      );
    }
  };

  const handleRemoveImage = (id: number) => {
    const filteredState = finalImages.filter((finalImg) => {
      return finalImg?.id !== id;
    });
    setFinalImages(filteredState);
  };

  if (isLoading || isSuccess) {
    return <LoadingHeading headingText="Uploading your post." />;
  }

  const isEmpty = finalImages.length < 1;
  const isFull = finalImages.length === 3;

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
      {finalImagesBase64 && <ImagesPreview imagesBase64={finalImagesBase64} onRemove={handleRemoveImage} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreatePostItemContainer>
          <Heading tag="h2">Info about post</Heading>
          <TextArea label="description" {...register('description')} />
          <div className={styles.actionButtons}>
            <Button variant="secondary" onClick={open}>
              Cancel
            </Button>
            <Button type="submit" disabled={Boolean(!dirtyFields.description || !finalImages)}>
              Complete
            </Button>
          </div>
        </CreatePostItemContainer>
      </form>

      <ModalContainer>
        {modalOpen && <ConfirmationAlert headingText="Cancel?" close={close} onConfirm={() => router.push('/')} />}
      </ModalContainer>
    </section>
  );
};
