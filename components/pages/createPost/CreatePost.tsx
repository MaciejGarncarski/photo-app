/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { getFinalImagesBase64 } from '@/utils/getFinalImagesBase64';

import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { TextWithLoader } from '@/components/atoms/textWithLoader/TextWithLoader';
import { AspectRatioButtons } from '@/components/molecules/aspectRatioButtons/AspectRatioButtons';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { CreatePostForm } from '@/components/molecules/createPostForm/CreatePostForm';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { ImagesPreview } from '@/components/molecules/imagesPreview/ImagesPreview';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';

import styles from './createPost.module.scss';

import { FinalImages, PostDetails } from './types';
import { useOnSubmit } from './useOnSubmit';

export const PostDetailsSchema = z.object({
  description: z.string().max(200, { message: 'Maximum characters exceeded.' }),
});

const formOptions: UseFormProps<PostDetails> = {
  resolver: zodResolver(PostDetailsSchema),
  defaultValues: {
    description: '',
  },
};

export const CreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const router = useRouter();

  const { open, close, modalOpen } = useModal();
  const { onSubmit } = useOnSubmit({ finalImages, setIsLoading });
  const { imagesBase64 } = getFinalImagesBase64(finalImages);

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<PostDetails>(formOptions);

  const onRemove = (id: string) => {
    const filteredState = finalImages.filter((finalImg) => {
      return finalImg?.id !== id;
    });
    setFinalImages(filteredState);
  };

  const isSubmitDisabled = !dirtyFields.description || finalImages.length === 0;

  if (isLoading) {
    return <TextWithLoader text="Uploading your post" />;
  }

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
      {imagesBase64 && <ImagesPreview imagesBase64={imagesBase64} onRemove={onRemove} />}
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
