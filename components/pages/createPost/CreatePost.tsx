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
import { Input } from '@/components/molecules/input/Input';
import { useCreatePost } from '@/components/pages/createPost/useCreatePost';

type FormValues = {
  description: string;
  location: string;
};

export const CreatePost = () => {
  const { push } = useRouter();
  const [finalImg, setFinalImg] = useState<Blob | null>(null);

  const { mutate } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<FormValues>({
    defaultValues: {
      description: '',
      location: '',
    },
  });

  const handleCancel = () => {
    push('/');
  };

  const onSubmit: SubmitHandler<FormValues> = ({ description, location }) => {
    if (!finalImg) {
      return;
    }
    mutate({ description, location, image: finalImg });
  };

  return (
    <section aria-labelledby='Create new post' className={styles.createPost}>
      <h2 className={clsx('heading', styles.heading)}>Create new post</h2>
      <CropImage setFinalImg={setFinalImg} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreatePostItemContainer>
          <h3 className='heading'>Info about post</h3>
          <Input
            data-testid='descriptionInput'
            labelText='Description'
            error={errors.description}
            className={styles.input}
            isDirty={dirtyFields.description}
            {...register('description')}
          />
          <Input
            labelText='Location'
            optional
            error={errors.location}
            className={styles.input}
            isDirty={dirtyFields.location}
            {...register('location')}
          />
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
