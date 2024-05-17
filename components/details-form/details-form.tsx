import { Trash } from '@phosphor-icons/react';

import { Button } from '@/components/buttons/button/button';
import { useDetailsForm } from '@/components/details-form/use-details-form';
import { Input } from '@/components/input/input';
import { Loader } from '@/components/loader/loader';
import { ConfirmationDialog } from '@/components/modals/confirmation-dialog/confirmation-dialog';
import { TextArea } from '@/components/textarea/text-area';
import type { User } from '@/schemas/user.schema';

import styles from './details-form.module.scss';

type DetailsForm = {
  user: User;
};

export const DetailsForm = ({ user }: DetailsForm) => {
  const {
    isPending,
    errors,
    isDirty,
    isError,
    cancelModal,
    onReset,
    onSubmit,
    register,
  } = useDetailsForm({ user });

  if (isPending) {
    return <Loader color="accent" size="big" />;
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        type="text"
        labelText="Username"
        placeholder="Username"
        variant="primary"
        error={errors.username?.message}
        {...register('username')}
      />
      <Input
        type="text"
        labelText="Full name"
        placeholder="Full name"
        variant="primary"
        error={errors.fullName?.message}
        {...register('fullName')}
      />
      <TextArea
        error={errors.bio?.message}
        placeholder="Aa"
        label="Bio"
        rows={6}
        {...register('bio')}
      />
      <div className={styles.buttons}>
        <Button
          type="reset"
          variant="destructive"
          onClick={onReset}
          disabled={!isDirty}
        >
          Reset
        </Button>
        <Button type="submit" variant="primary" disabled={isError || !isDirty}>
          Save changes
        </Button>
        <ConfirmationDialog
          text="Reset form?"
          isVisible={cancelModal.isModalOpen}
          closeModal={cancelModal.closeModal}
        >
          <Button variant="destructive" onClick={onReset}>
            Reset
            <Trash />
          </Button>
          <Button variant="secondary" onClick={cancelModal.closeModal}>
            Cancel
          </Button>
        </ConfirmationDialog>
      </div>
    </form>
  );
};
