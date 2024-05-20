"use client";

import { SignOut } from "@phosphor-icons/react";

import { useSignOut } from "@/hooks/use-sign-out";

import { Button } from "@/components/buttons/button/button";
import { ConfirmationDialog } from "@/components/modals/confirmation-dialog/confirmation-dialog";

type Props = {
  closeSettingsModal: () => void;
  signOutModal: {
    isModalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
  };
};

export const SignOutDialog = ({ closeSettingsModal, signOutModal }: Props) => {
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut.mutate();
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
