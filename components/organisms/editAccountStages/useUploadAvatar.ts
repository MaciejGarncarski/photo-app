import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';

import { FinalImages } from '@/components/pages/createPost/types';
import { useUploadImage } from '@/components/pages/createPost/useUploadImage';
import { useEditAccount } from '@/components/pages/editAccount/useEditAccount';

type UseUploadAvatarArguments = {
  finalImages: FinalImages;
  stagePersonalInfo: () => void;
  setFinalImages: (final: FinalImages) => void;
};

export const useUploadAvatar = ({ finalImages, setFinalImages, stagePersonalInfo }: UseUploadAvatarArguments) => {
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

    await editAccount.mutateAsync(
      { newAvatarUrl: imageUrl, userId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(['account', userId]);
          stagePersonalInfo();
        },
        onSettled: () => {
          setFinalImages([undefined]);
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
