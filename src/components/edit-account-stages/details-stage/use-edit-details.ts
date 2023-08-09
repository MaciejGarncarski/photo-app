import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { UseFormGetValues } from 'react-hook-form';

import { AccountDetails } from '@/src/components/edit-account-stages/account-details-validation';
import { useEditAccount } from '@/src/components/pages/edit-account/use-edit-account';

type UseEditDetailsArguments = {
  reset: () => void;
  openModal: () => void;
  getValues: UseFormGetValues<AccountDetails>;
  userId: string;
};

export const useEditDetails = ({
  reset,
  openModal,
  getValues,
}: UseEditDetailsArguments) => {
  const router = useRouter();
  const editAccount = useEditAccount();

  const onReset = (clickEv: MouseEvent) => {
    clickEv.preventDefault();
    reset();
  };

  const onClick = (clickEv: MouseEvent) => {
    clickEv.preventDefault();
    openModal();
  };

  const onSubmit = async () => {
    const { bio, fullName, username } = getValues();

    editAccount.mutate(
      { bio, name: fullName, username: username },
      {
        onSuccess: () => {
          router.push(`/${username}`);
        },
      },
    );
  };

  return {
    onClick,
    onReset,
    onSubmit,
    editAccountLoading: editAccount.isLoading,
  };
};
