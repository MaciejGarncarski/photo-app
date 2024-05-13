import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useEditAccount } from '@/components/pages/edit-account/use-edit-account';
import { AccountDetails } from '@/schemas/user.schema';

type UseEditDetailsArguments = {
  reset: () => void;
};

export const useEditDetails = ({ reset }: UseEditDetailsArguments) => {
  const router = useRouter();
  const editAccount = useEditAccount();

  const onReset = (clickEv: MouseEvent) => {
    clickEv.preventDefault();
    reset();
  };

  const editDetails: SubmitHandler<AccountDetails> = async ({
    bio,
    fullName,
    username,
  }) => {
    editAccount.mutate(
      { bio: bio || null, name: fullName || null, username: username || null },
      {
        onSuccess: () => {
          router.push(`/${username}`);
        },
      },
    );
  };

  return {
    onReset,
    editDetails,
    isPending: editAccount.isPending,
  };
};
