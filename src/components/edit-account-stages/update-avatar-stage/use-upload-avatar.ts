import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/use-auth';
import { apiClient } from '@/src/utils/api/api-client';

import { FinalImages } from '@/src/components/pages/create-post/types';

type UseUploadAvatarArguments = {
  stagePersonalInfo: () => void;
  finalImages: FinalImages;
  resetFinalImages: () => void;
};

export const useUploadAvatar = ({
  finalImages,
  resetFinalImages,
}: UseUploadAvatarArguments) => {
  const { sessionUser } = useAuth();
  const queryClient = useQueryClient();

  const uploadNewAvatar = useMutation({
    mutationFn: async ({ image }: { image: Blob }) => {
      const formData = new FormData();
      formData.append('image', image);

      return apiClient({
        url: '/user/avatar',
        method: 'POST',
        body: formData,
      });
    },
  });

  const isFinalImageEmpty = finalImages.filter((image) => !!image).length === 0;
  const onSaveImage = async () => {
    if (isFinalImageEmpty) {
      return;
    }
    if (!finalImages[0]?.file) {
      return;
    }

    uploadNewAvatar.mutate(
      { image: finalImages[0].file },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['session'] });
          await queryClient.invalidateQueries({
            queryKey: ['user', sessionUser?.id],
          });
        },
        onSettled: () => {
          resetFinalImages();
        },
      },
    );
  };

  return {
    onSaveImage,
    isLoading: uploadNewAvatar.isPending,
    isFinalImageEmpty,
  };
};
