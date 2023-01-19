/* eslint-disable @next/next/no-img-element */
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './createPost.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { AspectRatioButtons } from '@/components/molecules/aspectRatioButtons/AspectRatioButtons';
import { ConfirmationModal } from '@/components/molecules/confirmationModal/ConfirmationModal';
import { CropImage } from '@/components/molecules/cropImage/CropImage';
import { useCreatePost } from '@/components/pages/createPost/useCreatePost';

type FormValues = {
  description: string;
};

export const CreatePost = () => {
  const { push } = useRouter();
  const [finalImg, setFinalImg] = useState<Blob | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const { mutate, isLoading } = useCreatePost();

  const [isCanceling, setIsCanceling] = useState<boolean>(false);

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

  if (isLoading) {
    return (
      <section className={styles.loadingContainer} aria-labelledby="Upload loading">
        <Heading tag="h2" variant="center">
          Uploading your post
        </Heading>
        <Loading />
      </section>
    );
  }

  return (
    <section aria-labelledby="Create new post" className={styles.createPost}>
      <NextSeo title="Create new post" />
      {finalImg && <AspectRatioButtons aspect={aspectRatio} setAspect={setAspectRatio} />}
      <div className={styles.addPhoto}>
        <CreatePostItemContainer>
          <CropImage setFinalImg={setFinalImg} aspectRatio={aspectRatio} />
        </CreatePostItemContainer>
      </div>
      {finalImg && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CreatePostItemContainer>
            <Heading tag="h2">Info about post</Heading>
            <TextArea label="description" {...register('description')} />
            <div className={styles.actionButtons}>
              <Button variant="secondary" onClick={() => setIsCanceling(true)}>
                Cancel
              </Button>
              <Button type="submit" disabled={Boolean(!dirtyFields.description || !finalImg)}>
                Complete
              </Button>
            </div>
          </CreatePostItemContainer>
        </form>
      )}
      <AnimatePresence>
        {isCanceling && (
          <ConfirmationModal confirmText="Go back to home" setIsOpen={setIsCanceling} onConfirm={handleCancel} />
        )}
      </AnimatePresence>
    </section>
  );
};
