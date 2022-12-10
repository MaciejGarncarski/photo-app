/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import 'react-image-crop/src/ReactCrop.scss';
import styles from './createPost.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
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
      <h2 className={clsx('heading', styles.heading)}>Create new post</h2>
      <CropImage setFinalImg={setFinalImg} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreatePostItemContainer>
          <h3 className='heading'>Info about post</h3>
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
