'use client';

import { SignOut } from '@phosphor-icons/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { signOut } from '@/src/utils/sign-out';

import { Button } from '@/src/components/buttons/button/button';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';

type Props = {
  closeSettingsModal: () => void;
  signOutModal: {
    isModalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
  };
};

export const SignOutDialog = ({ closeSettingsModal, signOutModal }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignOut = () => {
    signOut(queryClient, () => router.push('/'));
    closeSettingsModal();
    signOutModal.closeModal();
  };

  return (
    <ConfirmationDialog
      isVisible={signOutModal.isModalOpen}
      text="Do you want to sign out?"
      closeModal={signOutModal.closeModal}
    >
      <Button variant="primary" onClick={handleSignOut}>
        <SignOut />
        Sign out
      </Button>
      <Button variant="secondary" onClick={signOutModal.closeModal}>
        Cancel
      </Button>
    </ConfirmationDialog>
  );
};
