import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/useAuth';
import { useFinalImages } from '@/src/hooks/useFinalImages';

import { useUploadImage } from '@/src/components/pages/createPost/useUploadImage';
import { useEditAccount } from '@/src/components/pages/editAccount/useEditAccount';

type UseUploadAvatarArguments = {
  stagePersonalInfo: () => void;
};

export const useUploadAvatar = ({ stagePersonalInfo }: UseUploadAvatarArguments) => {
  const { finalImages, resetFinalImages } = useFinalImages();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const uploadImage = useUploadImage();
  const editAccount = useEditAccount();

  const isFinalImageEmpty = finalImages.filter((image) => !!image).length === 0;
  const onSaveImage = async () => {
    if (isFinalImageEmpty) {
      return;
    }
    if (!finalImages[0]?.file) {
      return toast.error('Image not detected');
    }
    if (!session?.user?.id) {
      return;
    }
    const userId = session.user.id;

    const folder = `${userId}/avatar/custom/`;
    const imageUrl = await uploadImage.mutateAsync({ imageBlob: finalImages[0].file, folder });

    editAccount.mutate(
      { newAvatarUrl: imageUrl, userId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(['account', userId]);
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
    uploadImageLoading: uploadImage.isLoading,
    editAccountLoading: editAccount.isLoading,
    isFinalImageEmpty,
  };
};
