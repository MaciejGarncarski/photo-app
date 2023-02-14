/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { v4 } from 'uuid';
import { z } from 'zod';

import { useAuth } from '@/hooks/useAuth';

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
import { useUploadImage } from '@/components/pages/createPost/useUploadImage';

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
  const { session } = useAuth();

  const [isCropping, setIsCropping] = useState<boolean>(false);

  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const [finalImagesBase64, setFinalImagesBase64] = useState<ImagesBase64>();

  useConvertToBase64(finalImages, setFinalImagesBase64);

  const { open, close, modalOpen } = useModal();

  const uploadImage = useUploadImage();
  const sendNewPost = useSendNewPost();

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<PostDetails>({
    resolver: zodResolver(PostDetailsSchema),
    defaultValues: {
      description: '',
    },
  });

  const onSubmit: SubmitHandler<PostDetails> = async ({ description }) => {
    if (!finalImages[0]?.file) {
      return;
    }

    const uuid = v4();
    const folder = `${session?.user?.id}/posts/${uuid}`;

    const images = await Promise.all(
      finalImages.map(async (image) => {
        if (!image?.file) {
          return;
        }
        return await uploadImage.mutateAsync(
          { imageBlob: image.file, folder },
          {
            onError: () => {
              toast.error('Error');
            },
          },
        );
      }),
    );

    const imageUrls = images.filter((img): img is string => !!img);

    await sendNewPost.mutateAsync(
      { description, imageUrls },
      {
        onSuccess: async () => {
          await router.push('/');
        },
        onError: () => {
          toast.error('Could not add post.');
        },
      },
    );
  };

  const handleRemoveImage = (id: number) => {
    const filteredState = finalImages.filter((finalImg) => {
      return finalImg?.id !== id;
    });
    setFinalImages(filteredState);
  };

  if (uploadImage.isLoading || sendNewPost.isLoading || sendNewPost.isSuccess) {
    return <LoadingHeading headingText="Uploading your post." />;
  }

  const isSubmitDisabled = !dirtyFields.description || finalImages.length === 0;

  return (
    <section aria-labelledby="Create new post" className={styles.createPost}>
      <NextSeo title="Create new post" />

      {finalImages.length <= 3 && (
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
      {isCropping && <AspectRatioButtons aspect={aspectRatio} setAspect={setAspectRatio} />}
      {finalImagesBase64 && <ImagesPreview imagesBase64={finalImagesBase64} onRemove={handleRemoveImage} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreatePostItemContainer>
          <Heading tag="h2">Info about post</Heading>
          <TextArea label="description" {...register('description')} error={errors.description} />
          <div className={styles.actionButtons}>
            <Button variant="secondary" onClick={open}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitDisabled}>
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
