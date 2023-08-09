'use client';

/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useModal } from '@/src/hooks/use-modal';

import { CropImage } from '@/src/components/crop-image/crop-image';
import { CreatePostForm } from '@/src/components/forms/create-post-form/create-post-form';
import { ImagesPreview } from '@/src/components/images-preview/images-preview';
import { ConfirmationAlert } from '@/src/components/modals/confirmation-alert/confirmation-alert';
import { useFinalImages } from '@/src/components/pages/create-post/use-final-images';

import styles from './create-post.module.scss';

import { useOnSubmit } from './use-on-submit';

export const PostDetailsSchema = z.object({
  description: z
    .string()
    .min(1)
    .max(100, { message: 'Maximum characters exceeded.' }),
});

export const CreatePost = () => {
  const router = useRouter();
  const { openModal, closeModal, isModalOpen } = useModal();
  const { finalImages, previewImages, setFinalImages, onRemove } =
    useFinalImages();
  const { onSubmit, isUploadingPost } = useOnSubmit({ finalImages });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { dirtyFields, errors },
  } = useForm({
    resolver: zodResolver(PostDetailsSchema),
    defaultValues: {
      description: '',
    },
  });

  const isSubmitDisabled = !dirtyFields.description || finalImages.length === 0;

  if (isUploadingPost) {
    return null;
    //todo
  }

  return (
    <div className={styles.createPost}>
      {finalImages.length <= 3 && (
        <CropImage setFinalImages={setFinalImages} finalImages={finalImages} />
      )}
      <ImagesPreview previewImages={previewImages} onRemove={onRemove} />
      <CreatePostForm
        isEmpty={getValues('description') === ''}
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
    </div>
  );
};
