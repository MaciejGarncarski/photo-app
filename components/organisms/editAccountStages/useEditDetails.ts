import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { UseFormGetValues } from 'react-hook-form';

import { AccountDetails } from '@/components/organisms/editAccountStages/accountDetailts';
import { useEditAccount } from '@/components/pages/editAccount/useEditAccount';

type UseEditDetailsArguments = {
  reset: () => void;
  open: () => void;
  getValues: UseFormGetValues<AccountDetails>;
  userId: string;
};

export const useEditDetails = ({ reset, open, getValues, userId }: UseEditDetailsArguments) => {
  const router = useRouter();
  const editAccount = useEditAccount();

  const onReset = (clickEv: MouseEvent<HTMLButtonElement>) => {
    clickEv.preventDefault();
    reset();
  };

  const onClick = (clickEv: MouseEvent<HTMLButtonElement>) => {
    clickEv.preventDefault();
    open();
  };

  const onSubmit = async () => {
    const { bio, fullName, username } = getValues();

    await editAccount.mutateAsync(
      { bio, fullName, userId, username },
      {
        onSuccess: () => {
          router.push(`/${username}`);
        },
      },
    );
  };

  return { onClick, onReset, onSubmit, editAccountLoading: editAccount.isLoading };
};
