'use client';

import { CameraPlus } from '@phosphor-icons/react';
import { AnimatePresence } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { useAuth } from '@/src/hooks/use-auth';
import { useModal } from '@/src/hooks/use-modal';

import { Avatar } from '@/src/components/avatar/avatar';
import { Button } from '@/src/components/buttons/button/button';
import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { DetailsForm } from '@/src/components/details-form/details-form';
import { Loader } from '@/src/components/loader/loader';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';
import { useDeleteAvatar } from '@/src/components/pages/edit-account/use-delete-avatar';
import { Heading } from '@/src/components/typography/heading/heading';
import { UpdateAvatarView } from '@/src/components/update-avatar-view/update-avatar-view';

import styles from './edit-account.module.scss';

export const EditAccount = () => {
  const { sessionUser } = useAuth();
  const updateAvatarModal = useModal();
  const removeAvatarModal = useModal();

  const { mutate, isPending } = useDeleteAvatar();

  const removeAvatar = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          removeAvatarModal.closeModal();
        },
      },
    );
  };

  if (!sessionUser) {
    return <Loader size="big" color="accent" marginTop />;
  }

  const hasProfilePicture = sessionUser.avatar;

  return (
    <>
      <div className={styles.container}>
        <Heading tag="h2" size="big">
          Edit profile
        </Heading>
        <div className={styles.avatar}>
          <button
            type="button"
            className={styles.avatarButton}
            onClick={updateAvatarModal.openModal}
          >
            <span className={styles.icon}>
              <CameraPlus />
            </span>
            <Avatar userId={sessionUser.id} size="big" />
            <span className="visually-hidden">Update avatar</span>
          </button>
          {hasProfilePicture && (
            <Button
              type="button"
              variant="destructive"
              onClick={removeAvatarModal.openModal}
              disabled={isPending}
            >
              Remove profile picture
            </Button>
          )}
        </div>
        <DetailsForm user={sessionUser} />
      </div>

      <ConfirmationDialog
        isVisible={removeAvatarModal.isModalOpen}
        text="Remove your profile picture? Be careful, this action cannot be reversed!"
        closeModal={removeAvatarModal.closeModal}
      >
        <Button type="button" variant="destructive" onClick={removeAvatar}>
          Remove profile picture
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={removeAvatarModal.closeModal}
        >
          Cancel
        </Button>
      </ConfirmationDialog>

      <AnimatePresence mode="wait">
        {updateAvatarModal.isModalOpen && (
          <ModalBackdrop closeModal={() => null}>
            <ReactFocusLock autoFocus={false}>
              <div className={styles.modal}>
                <div className={styles.modalHeader}>
                  <Heading size="medium" tag="h3">
                    Update avatar
                  </Heading>
                  <div className={styles.closeButton}>
                    <ModalCloseButton
                      onClose={updateAvatarModal.closeModal}
                      variant="primary"
                    />
                  </div>
                </div>
                <UpdateAvatarView closeModal={updateAvatarModal.closeModal} />
              </div>
            </ReactFocusLock>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </>
  );
};
