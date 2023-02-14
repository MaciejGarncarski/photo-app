import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { clientEnv } from '@/utils/env.mjs';

type UploadImages = {
  imageBlob: Blob;
  folder: string;
};

const uploadImage = async ({ imageBlob, folder }: UploadImages) => {
  const { data } = await axios.get('/api/imageKitAuth');

  const { data: uploadedData } = await axios.postForm('https://upload.imagekit.io/api/v1/files/upload', {
    signature: data.signature,
    expire: data.expire,
    token: data.token,

    file: imageBlob,
    fileName: `/image.webp`,
    folder: folder,
    publicKey: clientEnv.NEXT_PUBLIC_IMG_KIT_PUBLIC,
  });

  if (uploadedData?.url) {
    return uploadedData.url;
  }
};

export const useUploadImage = () => {
  return useMutation(async ({ folder, imageBlob }: UploadImages) => {
    return await uploadImage({ imageBlob, folder });
  });
};
