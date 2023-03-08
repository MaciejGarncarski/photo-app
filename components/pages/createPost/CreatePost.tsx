/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { LoadingHeading } from '@/components/atoms/loadingHeading/LoadingHeading';
import { AspectRatioButtons } from '@/components/molecules/aspectRatioButtons/AspectRatioButtons';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { CreatePostForm } from '@/components/molecules/createPostForm/CreatePostForm';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { ImagesPreview } from '@/components/molecules/imagesPreview/ImagesPreview';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { useConvertToBase64 } from '@/components/pages/createPost/useConvertToBase64';

import styles from './createPost.module.scss';

import { FinalImages, ImagesBase64, PostDetails } from './types';
import { useOnSubmit } from './useOnSubmit';

export const PostDetailsSchema = z.object({
  description: z.string().max(200, { message: 'Maximum characters exceeded' }),
});

export const CreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const [finalImagesBase64, setFinalImagesBase64] = useState<ImagesBase64>();
  const router = useRouter();

  const { open, close, modalOpen } = useModal();
  const { onSubmit } = useOnSubmit({ finalImages, setIsLoading });
  useConvertToBase64(finalImages, setFinalImagesBase64);

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

  const handleRemoveImage = (id: string) => {
    const filteredState = finalImages.filter((finalImg) => {
      return finalImg?.id !== id;
    });
    setFinalImages(filteredState);
  };

  if (isLoading) {
    return <LoadingHeading headingText="Uploading your post" />;
  }

  const isSubmitDisabled = !dirtyFields.description || finalImages.length === 0;

  return (
    <motion.section
      aria-labelledby="Create new post"
      className={styles.createPost}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <NextSeo title="Create new post" />
      {finalImages.length <= 3 && (
        <div className={styles.addPhoto}>
          <CreatePostItemContainer>
            <CropImage setFinalImages={setFinalImages} finalImages={finalImages} aspectRatio={aspectRatio} />
          </CreatePostItemContainer>
        </div>
      )}
      <AspectRatioButtons aspect={aspectRatio} setAspect={setAspectRatio} />
      {finalImagesBase64 && <ImagesPreview imagesBase64={finalImagesBase64} onRemove={handleRemoveImage} />}
      <CreatePostForm
        disabled={isSubmitDisabled}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        open={open}
        register={register}
      />

      <ModalContainer>
        {modalOpen && <ConfirmationAlert headingText="Cancel?" close={close} onConfirm={() => router.push('/')} />}
      </ModalContainer>
    </motion.section>
  );
};
