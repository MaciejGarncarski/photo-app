import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useModal } from '@/src/hooks/useModal';
import { useUser } from '@/src/hooks/useUser';

import {
  AccountDetails,
  AccountDetailsSchema,
} from '@/src/components/organisms/editAccountStages/accountDetailtsValidation';
import { useEditDetails } from '@/src/components/organisms/editAccountStages/detailsStage/useEditDetails';

type Arguments = {
  userId: string;
};

export const useDetailsStage = ({ userId }: Arguments) => {
  const { data, isLoading } = useUser({ userId });
  const formRef = useRef<HTMLFormElement>(null);
  const { closeModal, isModalOpen, openModal } = useModal();

  const {
    register,
    reset,
    getValues,
    formState: { isDirty, errors },
  } = useForm<AccountDetails>({
    defaultValues: {
      username: data?.username || '',
      fullName: data?.name || '',
      bio: data?.bio || '',
    },
    mode: 'all',
    resolver: zodResolver(AccountDetailsSchema),
  });

  const { onReset, onClick, onSubmit, editAccountLoading } = useEditDetails({ getValues, openModal, reset, userId });

  const isError = Boolean(errors.bio || errors.fullName || errors.username);

  return {
    isError,
    errors,
    isDirty,
    register,
    closeModal,
    onClick,
    onSubmit,
    editAccountLoading,
    onReset,
    isLoading,
    formRef,
    isModalOpen,
  };
};
