import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { UseFormGetValues } from 'react-hook-form';

import { AccountDetails } from '@/src/components/organisms/editAccountStages/accountDetailts';
import { useEditAccount } from '@/src/components/pages/editAccount/useEditAccount';

type UseEditDetailsArguments = {
  reset: () => void;
  open: () => void;
  getValues: UseFormGetValues<AccountDetails>;
  userId: string;
};

export const useEditDetails = ({ reset, open, getValues, userId }: UseEditDetailsArguments) => {
  const router = useRouter();
  const editAccount = useEditAccount();

  const onReset = (clickEv: MouseEvent) => {
    clickEv.preventDefault();
    reset();
  };

  const onClick = (clickEv: MouseEvent) => {
    clickEv.preventDefault();
    open();
  };

  const onSubmit = async () => {
    const { bio, fullName, username } = getValues();

    editAccount.mutate(
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
