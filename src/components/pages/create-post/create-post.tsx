'use client';

/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CropImage } from '@/src/components/crop-image/crop-image';
import { CreatePostForm } from '@/src/components/forms/create-post-form/create-post-form';
import { ImagesPreview } from '@/src/components/images-preview/images-preview';
import { useFinalImages } from '@/src/components/pages/create-post/use-final-images';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './create-post.module.scss';

import { useOnSubmit } from './use-on-submit';

export const PostDetailsSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'Description cannot be empty.' })
    .max(100, { message: 'Maximum characters exceeded.' }),
});

export const CreatePost = () => {
  const router = useRouter();
  const { finalImages, previewImages, setFinalImages, onRemove } =
    useFinalImages();
  const { onSubmit, isPending, isError } = useOnSubmit({ finalImages });

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm({
    resolver: zodResolver(PostDetailsSchema),
    defaultValues: {
      description: '',
    },
  });

  const isSubmitDisabled =
    !dirtyFields.description || finalImages.length === 0 || isPending;

  if (isError) {
    return <p>Cannot upload post.</p>;
  }

  return (
    <main className={styles.createPost}>
      <Heading tag="h2" size="big">
        Create post
      </Heading>
      {finalImages.length <= 3 && (
        <CropImage setFinalImages={setFinalImages} finalImages={finalImages} />
      )}
      <ImagesPreview previewImages={previewImages} onRemove={onRemove} />
      <CreatePostForm
        disabled={isSubmitDisabled}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        openModal={() => router.back()}
        register={register}
      />
    </main>
  );
};
