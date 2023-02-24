import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';

import styles from './editPost.module.scss';

import { usePost } from '../account/usePost';
import { PostDetailsSchema } from '../createPost/CreatePost';

export const EditPost = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const { status, sessionUserData } = useAuth();
  const { data, isLoading } = usePost({ postId });

  const saveModal = useModal();
  const cancelModal = useModal();

  const {
    formState: { errors },
    register,
    getValues,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(PostDetailsSchema),
    defaultValues: {
      description: data?.description ?? '',
    },
  });

  const { mutate } = useMutation(
    async ({ description }: { description: string }) => {
      return axios.post('/api/post/edit', {
        postId,
        description,
      });
    },
    { onSuccess: () => router.push(`/post/${postId}`) },
  );

  const onSubmit = () => {
    const { description } = getValues();
    mutate({ description });
  };

  if (status === 'loading') {
    return null;
  }

  if (status !== 'authenticated' || data?.authorId !== sessionUserData.id) {
    return <AccessDenied />;
  }

  if (!data || isLoading) {
    return <p>loading</p>;
  }

  return (
    <section className={styles.editPost}>
      <Heading tag="h2">Edit post</Heading>
      <form className={styles.form}>
        <TextArea label="Description" {...register('description')} error={errors.description} />

        <div className={styles.buttons}>
          <Button type="button" variant="secondary" onClick={cancelModal.open}>
            Cancel
          </Button>
          <Button type="button" onClick={saveModal.open}>
            Save
          </Button>
        </div>
      </form>
      <ModalContainer>
        {cancelModal.modalOpen && (
          <ConfirmationAlert headingText="Cancel changes?" onConfirm={router.back} close={cancelModal.close} />
        )}
        {saveModal.modalOpen && (
          <ConfirmationAlert headingText="Save changes?" onConfirm={onSubmit} close={saveModal.close} />
        )}
      </ModalContainer>
    </section>
  );
};
