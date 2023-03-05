import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { clientEnv } from '@/utils/env.mjs';

export type UploadImages = {
  imageBlob: Blob;
  folder: string;
  isPost?: boolean;
};

const uploadImage = async ({ imageBlob, folder, isPost }: UploadImages) => {
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

  if (!uploadedData) {
    return;
  }

  if (!isPost) {
    return uploadedData.url;
  }

  const { fileId, name, url, thumbnailUrl, width, height, size } = uploadedData;

  const { data: postImageId } = await axios.post<number>('/api/post/postImage', {
    fileId,
    name,
    url,
    thumbnailUrl,
    width,
    size,
    height,
  });

  return postImageId;
};

export const useUploadImage = () => {
  return useMutation(async ({ folder, imageBlob, isPost }: UploadImages) => {
    return await uploadImage({ imageBlob, folder, isPost });
  });
};
