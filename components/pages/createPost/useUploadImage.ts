import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '@/hooks/useAuth';
import { clientEnv } from '@/utils/env.mjs';

type MutationValues = {
  imageUuid: string;
  imageBlob: Blob;
};

type UploadImages = MutationValues & {
  authorId: string;
};

const uploadImage = async ({ imageUuid, authorId, imageBlob }: UploadImages) => {
  const { data } = await axios.get('/api/imageKitAuth');

  const { data: uploadedData } = await axios.postForm('https://upload.imagekit.io/api/v1/files/upload', {
    signature: data.signature,
    expire: data.expire,
    token: data.token,

    file: imageBlob,
    fileName: `/image.webp`,
    folder: `${authorId}/posts/${imageUuid}`,
    publicKey: clientEnv.NEXT_PUBLIC_IMG_KIT_PUBLIC,
  });

  if (uploadedData?.url) {
    return uploadedData.url;
  }
};

export const useUploadImage = () => {
  const { session } = useAuth();

  return useMutation(async ({ imageUuid, imageBlob }: MutationValues) => {
    if (!session?.user?.id) {
      return;
    }

    return await uploadImage({ authorId: session.user.id, imageBlob, imageUuid });
  });
};
