import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useModal } from '@/src/hooks/useModal';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { Heading } from '@/src/components/atoms/heading/Heading';
import { TextArea } from '@/src/components/atoms/textArea/TextArea';

import { Loader } from '@/src/components/molecules/loader/Loader';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';

import { useEditPost } from '@/src/components/pages/editPost/useEditPost';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

import styles from './editPost.module.scss';

import { usePost } from '../account/usePost';
import { PostDetailsSchema } from '../createPost/CreatePost';

export const EditPost = () => {
  const router = useRouter();
  const postId = parseInt(router.query.id as string);
  const { data, isLoading } = usePost({ postId });
  const { mutate } = useEditPost({ postId });
  const saveModal = useModal();
  const cancelModal = useModal();

  const {
    formState: { errors, isDirty },
    register,
    getValues,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(PostDetailsSchema),
    defaultValues: {
      description: data?.description ?? '',
    },
  });

  const onSubmit = () => {
    const { description } = getValues();
    mutate({ description });
  };

  if (!data || isLoading) {
    return <Loader color="blue" size="normal" />;
  }

  return (
    <ProtectedPage shouldBeSignedIn>
      <section className={styles.editPost}>
        <Heading tag="h2" size="medium">
          Edit post
        </Heading>
        <form className={styles.form}>
          <TextArea label="Description" {...register('description')} error={errors.description?.message} />
          <div className={styles.buttons}>
            <Button type="button" variant="secondary" onClick={cancelModal.openModal}>
              Cancel
            </Button>
            <Button type="button" variant="primary" disabled={!isDirty} onClick={saveModal.openModal}>
              Save
            </Button>
          </div>
        </form>
        <ConfirmationAlert
          isVisible={cancelModal.isModalOpen}
          headingText="Cancel changes?"
          onConfirm={router.back}
          closeModal={cancelModal.closeModal}
        />
        <ConfirmationAlert
          isVisible={saveModal.isModalOpen}
          headingText="Save changes?"
          onConfirm={onSubmit}
          closeModal={saveModal.closeModal}
        />
      </section>
    </ProtectedPage>
  );
};
