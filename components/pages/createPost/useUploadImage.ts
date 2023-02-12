import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '@/hooks/useAuth';

type MutationValues = {
  imageUuid: string;
  imageBlob: Blob;
};

type UploadImages = MutationValues & {
  authorId: string;
};

const uploadImage = async ({ imageUuid, authorId, imageBlob }: UploadImages) => {
  const { data } = await axios.postForm<string>('/api/post/uploadImage', {
    uuid: imageUuid,
    authorId: authorId,
    image: imageBlob,
  });

  return data;
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
