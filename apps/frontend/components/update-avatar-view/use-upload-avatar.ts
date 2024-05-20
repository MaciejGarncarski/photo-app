import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { apiClient } from "@/utils/api/api-client";

import type { FinalImages } from "@/components/pages/create-post/create-post-schema";

type UseUploadAvatarArguments = {
  finalImages: FinalImages;
  resetFinalImages: () => void;
  closeModal: () => void;
};

export const useUploadAvatar = ({
  finalImages,
  resetFinalImages,
  closeModal,
}: UseUploadAvatarArguments) => {
  const { sessionUser } = useAuth();
  const queryClient = useQueryClient();

  const uploadNewAvatar = useMutation({
    mutationFn: async ({ image }: { image: Blob }) => {
      const formData = new FormData();
      formData.append("image", image);

      return apiClient({
        url: "/user/avatar",
        method: "PUT",
        body: formData,
      });
    },
    onError: () => {
      toast.error("Cannot update avatar.");
      closeModal();
    },
    onSuccess: () => {
      toast.success("Avatar updated.");
      closeModal();
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
          await queryClient.invalidateQueries({ queryKey: ["session"] });
          await queryClient.invalidateQueries({
            queryKey: ["user", sessionUser?.id],
          });
        },
        onSettled: () => {
          resetFinalImages();
        },
      }
    );
  };

  return {
    onSaveImage,
    isPending: uploadNewAvatar.isPending,
    isFinalImageEmpty,
  };
};
