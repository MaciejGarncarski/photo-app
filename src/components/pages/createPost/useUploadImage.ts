import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { apiClient } from '@/src/utils/apis/apiClient';
import { clientEnv } from '@/src/utils/env';

export type UploadImages = {
  imageBlob: Blob;
  folder: string;
  isPost?: boolean;
};

const UPLOAD_URL = 'https://upload.imagekit.io/api/v1/files/upload';

const uploadImage = async ({ imageBlob, folder, isPost }: UploadImages) => {
  const { data } = await axios.get('/api/imageKitAuth');

  const { data: uploadedData } = await axios.postForm(UPLOAD_URL, {
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

  const { data: postImageId } = await apiClient.post<number>('post/postImage', {
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
