import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/useAuth';

import { FinalImages } from '@/src/components/pages/createPost/types';
import { uploadAvatar } from '@/src/services/user.service';

type UseUploadAvatarArguments = {
  stagePersonalInfo: () => void;
  finalImages: FinalImages;
  resetFinalImages: () => void;
};

export const useUploadAvatar = ({
  stagePersonalInfo,
  finalImages,
  resetFinalImages,
}: UseUploadAvatarArguments) => {
  const { sessionUser } = useAuth();
  const queryClient = useQueryClient();

  const uploadNewAvatar = useMutation({
    mutationFn: uploadAvatar,
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
