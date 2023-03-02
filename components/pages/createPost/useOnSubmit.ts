import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { v4 } from 'uuid';

import { useAuth } from '@/hooks/useAuth';

import { FinalImages, PostDetails } from './types';
import { useSendNewPost } from './useSendNewPost';
import { useUploadImage } from './useUploadImage';

type PropsTypes = {
  finalImages: FinalImages;
};

export const useOnSubmit = ({ finalImages }: PropsTypes) => {
  const { session } = useAuth();
  const uploadImage = useUploadImage();
  const sendNewPost = useSendNewPost();

  const onSubmit: SubmitHandler<PostDetails> = async ({ description }) => {
    if (!finalImages[0]?.file) {
      return;
    }

    const uuid = v4();
    const folder = `${session?.user?.id}/posts/${uuid}`;

    const images = await Promise.all(
      finalImages.map(async (image) => {
        if (!image?.file) {
          return;
        }
        return await uploadImage.mutateAsync(
          { imageBlob: image.file, folder, isPost: true },
          {
            onError: () => {
              toast.error('Could not add post.');
            },
          },
        );
      }),
    );
    const imageUrls = images.filter((img): img is number => !!img);

    await sendNewPost.mutateAsync(
      { description, imageUrls },
      {
        onError: () => {
          toast.error('Could not add post.');
        },
      },
    );
  };
  return { onSubmit };
};
