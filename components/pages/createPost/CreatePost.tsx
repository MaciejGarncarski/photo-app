/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import 'react-image-crop/src/ReactCrop.scss';
import styles from './createPost.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CropPostImage } from '@/components/molecules/cropPostImage/CropPostImage';
import { Input } from '@/components/molecules/input/Input';

type FormValues = {
  description: string;
  location: string;
};

export const CreatePost = () => {
  const { push } = useRouter();
  const [finalImg, setFinalImg] = useState<Blob | null>(null);

  const {
    register,
    formState: { isDirty, dirtyFields, errors },
  } = useForm<FormValues>({
    defaultValues: {
      description: '',
      location: '',
    },
  });

  const handleCancel = () => {
    push('/');
  };

  return (
    <section aria-labelledby='Create new post' className={styles.createPost}>
      <h2 className={styles.heading}>Create new post</h2>
      <CropPostImage setFinalImg={setFinalImg} />
      <div className={styles.inputs}>
        <Input
          labelText='Description'
          isDirty={dirtyFields.description}
          error={errors.description}
          {...register('description')}
        />
        <Input
          labelText='Location'
          optional
          error={errors.location}
          isDirty={dirtyFields.location}
          {...register('location')}
        />
      </div>
      <div className={styles.buttons}>
        <Button variant='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={!dirtyFields.description || !finalImg}>Complete</Button>
      </div>
    </section>
  );
};
