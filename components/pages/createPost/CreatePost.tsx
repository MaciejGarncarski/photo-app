/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import 'react-image-crop/src/ReactCrop.scss';
import styles from './createPost.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { useCreatePost } from '@/components/pages/createPost/useCreatePost';

type FormValues = {
  description: string;
};

export const CreatePost = () => {
  const { push } = useRouter();
  const [finalImg, setFinalImg] = useState<Blob | null>(null);

  const { mutate } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<FormValues>({
    defaultValues: {
      description: '',
    },
  });

  const handleCancel = () => {
    push('/');
  };

  const onSubmit: SubmitHandler<FormValues> = ({ description }) => {
    if (!finalImg) {
      return;
    }
    mutate({ description, image: finalImg });
  };

  return (
    <section aria-labelledby='Create new post' className={styles.createPost}>
      <Heading tag='h2' className={styles.heading}>
        Create new post
      </Heading>
      <CropImage setFinalImg={setFinalImg} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreatePostItemContainer>
          <Heading tag='h3'>Info about post</Heading>
          <div className={styles.textAreaContainer}>
            <textarea
              id='description'
              className={styles.textArea}
              cols={30}
              rows={10}
              {...register('description')}
            ></textarea>
            <label htmlFor='description' className={styles.label}>
              Description
            </label>
          </div>
          <div className={styles.actionButtons}>
            <Button variant='secondary' onClick={handleCancel}>
              Cancel
            </Button>
            <Button type='submit' disabled={Boolean(!dirtyFields.description || !finalImg)}>
              Complete
            </Button>
          </div>
        </CreatePostItemContainer>
      </form>
    </section>
  );
};
