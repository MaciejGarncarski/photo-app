/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useIsCropping } from '@/src/hooks/useIsCropping';
import { getFinalImagesBase64 } from '@/src/utils/getFinalImagesBase64';

import { ConfirmationAlert } from '@/src/components/molecules/confirmationAlert/ConfirmationAlert';
import { CreatePostForm } from '@/src/components/molecules/createPostForm/CreatePostForm';
import { CropImage } from '@/src/components/molecules/cropImage/CropImage';
import { ImagesPreview } from '@/src/components/molecules/imagesPreview/ImagesPreview';
import { useModal } from '@/src/components/molecules/modal/useModal';
import { TextWithLoader } from '@/src/components/molecules/textWithLoader/TextWithLoader';

import styles from './createPost.module.scss';

import { FinalImages, PostDetails } from './types';
import { useOnSubmit } from './useOnSubmit';

export const PostDetailsSchema = z.object({
  description: z.string().max(200, { message: 'Maximum characters exceeded.' }),
});

export const CreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const router = useRouter();
  const { isCropping } = useIsCropping();

  const { open, close, modalOpen } = useModal();
  const { onSubmit } = useOnSubmit({ finalImages, setIsLoading });
  const { imagesBase64 } = getFinalImagesBase64(finalImages);

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

  const onRemove = (id: string) => {
    const filteredState = finalImages.filter((finalImg) => {
      return finalImg?.id !== id;
    });
    setFinalImages(filteredState);
  };

  const isSubmitDisabled = !dirtyFields.description || finalImages.length === 0;
  const canShowPreviews = imagesBase64 && !isCropping;

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
          <CropImage setFinalImages={setFinalImages} finalImages={finalImages} />
        </div>
      )}
      {canShowPreviews && <ImagesPreview imagesBase64={imagesBase64} onRemove={onRemove} />}
      <CreatePostForm
        disabled={isSubmitDisabled}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        open={open}
        register={register}
      />
      <ConfirmationAlert isVisible={modalOpen} headingText="Cancel?" close={close} onConfirm={() => router.push('/')} />
    </motion.main>
  );
};
