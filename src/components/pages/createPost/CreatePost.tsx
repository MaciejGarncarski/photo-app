/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useFinalImages } from '@/src/hooks/useFinalImages';
import { useIsCropping } from '@/src/hooks/useIsCropping';
import { useModal } from '@/src/hooks/useModal';
import { getPreviewImages } from '@/src/utils/getPreviewImages';

import { CreatePostForm } from '@/src/components/molecules/createPostForm/CreatePostForm';
import { ImagesPreview } from '@/src/components/molecules/imagesPreview/ImagesPreview';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { CropImage } from '@/src/components/organisms/cropImage/CropImage';
import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import styles from './createPost.module.scss';

import { PostDetails } from './types';
import { useOnSubmit } from './useOnSubmit';

export const PostDetailsSchema = z.object({
  description: z.string().max(200, { message: 'Maximum characters exceeded.' }),
});

export const CreatePost = () => {
  const { finalImages, setFinalImages } = useFinalImages();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isCropping } = useIsCropping();

  const { openModal, closeModal, isModalOpen } = useModal();
  const { onSubmit } = useOnSubmit({ setIsLoading });
  const { previewImages } = getPreviewImages(finalImages);

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

  const onRemove = (id: number) => {
    const filteredState = finalImages.filter((finalImg) => {
      return finalImg?.id !== id;
    });
    setFinalImages(filteredState);
  };

  const isSubmitDisabled = !dirtyFields.description || finalImages.length === 0;
  const canShowPreviews = previewImages && !isCropping;

  if (isLoading) {
    return <TextWithLoader text="Uploading your post" />;
  }

  return (
    <motion.main
      aria-labelledby="Create new post"
      className={styles.createPost}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <NextSeo title="Create new post" />
      {finalImages.length <= 3 && (
        <div className={styles.addPhoto}>
          <CropImage />
        </div>
      )}
      {canShowPreviews && <ImagesPreview previewImages={previewImages} onRemove={onRemove} />}
      <CreatePostForm
        disabled={isSubmitDisabled}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        openModal={openModal}
        register={register}
      />
      <ConfirmationAlert
        isVisible={isModalOpen}
        headingText="Cancel?"
        closeModal={closeModal}
        onConfirm={() => router.push('/')}
      />
    </motion.main>
  );
};
