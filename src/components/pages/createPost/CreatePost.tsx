/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useModal } from '@/src/hooks/useModal';

import { CreatePostForm } from '@/src/components/molecules/createPostForm/CreatePostForm';
import { ImagesPreview } from '@/src/components/molecules/imagesPreview/ImagesPreview';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { CropImage } from '@/src/components/organisms/cropImage/CropImage';
import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import { useFinalImages } from '@/src/components/pages/createPost/useFinalImages';

import styles from './createPost.module.scss';

import { PostDetails } from './types';
import { useOnSubmit } from './useOnSubmit';

export const PostDetailsSchema = z.object({
  description: z.string().max(200, { message: 'Maximum characters exceeded.' }),
});

export const CreatePost = () => {
  const router = useRouter();
  const { openModal, closeModal, isModalOpen } = useModal();
  const { finalImages, previewImages, setFinalImages, onRemove } = useFinalImages();
  const { onSubmit, isUploadingPost } = useOnSubmit({ finalImages });

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

  const isSubmitDisabled = !dirtyFields.description || finalImages.length === 0;

  if (isUploadingPost) {
    return <TextWithLoader text="Uploading your post" />;
  }

  return (
    <div className={styles.createPost}>
      <NextSeo title="Create new post" />
      {finalImages.length <= 3 && (
        <div className={styles.addPhoto}>
          <CropImage setFinalImages={setFinalImages} finalImages={finalImages} />
        </div>
      )}
      <ImagesPreview previewImages={previewImages} onRemove={onRemove} />
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
    </div>
  );
};
