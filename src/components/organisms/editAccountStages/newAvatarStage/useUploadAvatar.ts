import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/useAuth';
import { clientEnv } from '@/src/utils/env';

import { FinalImages } from '@/src/components/pages/createPost/types';

type UseUploadAvatarArguments = {
  stagePersonalInfo: () => void;
  finalImages: FinalImages;
  resetFinalImages: () => void;
};

type Mutation = {
  avatarFile: Blob;
};

export const useUploadAvatar = ({ stagePersonalInfo, finalImages, resetFinalImages }: UseUploadAvatarArguments) => {
  const { sessionUser } = useAuth();
  const queryClient = useQueryClient();

  const uploadNewAvatar = useMutation({
    mutationFn: ({ avatarFile }: Mutation) => {
      const formData = new FormData();
      formData.append('image', avatarFile);

      return axios.postForm(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/session-user/update-avatar`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });

  const isFinalImageEmpty = finalImages.filter((image) => !!image).length === 0;
  const onSaveImage = async () => {
    if (isFinalImageEmpty) {
      return;
    }
    if (!finalImages[0]?.file) {
      return toast.error('Image not detected');
    }

    uploadNewAvatar.mutate(
      { avatarFile: finalImages[0].file },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(['user', sessionUser?.id]);
          stagePersonalInfo();
        },
        onSettled: () => {
          resetFinalImages();
        },
      },
    );
  };

  return {
    onSaveImage,
    isLoading: uploadNewAvatar.isLoading,
    isFinalImageEmpty,
  };
};
