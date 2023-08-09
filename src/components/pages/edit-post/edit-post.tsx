import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useModal } from '@/src/hooks/use-modal';

import { Button } from '@/src/components/buttons/button/button';
import { Loader } from '@/src/components/loader/loader';
import { ConfirmationAlert } from '@/src/components/modals/confirmation-alert/confirmation-alert';
import { usePost } from '@/src/components/pages/account/use-post';
import { PostDetailsSchema } from '@/src/components/pages/create-post/create-post';
import { useEditPost } from '@/src/components/pages/edit-post/use-edit-post';
import { TextArea } from '@/src/components/textarea/text-area';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './edit-post.module.scss';

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
    setValue,
    getValues,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(PostDetailsSchema),
    defaultValues: {
      description: data?.description ?? '',
    },
  });

  useEffect(() => {
    if (data?.description) {
      setValue('description', data.description);
    }
  }, [data?.description, setValue]);

  if (!data?.description || isLoading) {
    return <Loader color="blue" size="normal" />;
  }

  const onSubmit = () => {
    const { description } = getValues();
    mutate({ description }, { onSettled: saveModal.closeModal });
  };

  const cancelChanges = () => {
    router.back();
  };

  return (
    <section className={styles.editPost}>
      <Heading tag="h2" size="medium">
        Edit post
      </Heading>
      <form className={styles.form}>
        <TextArea
          label="Description"
          isEmpty={getValues('description') === ''}
          {...register('description')}
          error={errors.description?.message}
        />
        <div className={styles.buttons}>
          <Button
            type="button"
            variant="secondary"
            onClick={cancelModal.openModal}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={!isDirty || Boolean(errors.description)}
            onClick={saveModal.openModal}
          >
            Save
          </Button>
        </div>
      </form>
      <ConfirmationAlert
        isVisible={cancelModal.isModalOpen}
        headingText="Abort editing?"
        onConfirm={cancelChanges}
        closeModal={cancelModal.closeModal}
      />
      <ConfirmationAlert
        isVisible={saveModal.isModalOpen}
        headingText="Save changes?"
        onConfirm={onSubmit}
        closeModal={saveModal.closeModal}
      />
    </section>
  );
};
