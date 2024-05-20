import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import type { SubmitHandler } from "react-hook-form";

import { useEditAccount } from "@/components/pages/edit-account/use-edit-account";
import type { AccountDetails } from "@/schemas/user.schema";

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
      }
    );
  };

  return {
    onReset,
    editDetails,
    isPending: editAccount.isPending,
  };
};
