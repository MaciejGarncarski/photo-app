import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { v4 } from 'uuid';

import { useAuth } from '@/src/hooks/useAuth';
import { useFinalImages } from '@/src/hooks/useFinalImages';

import { PostDetails } from './types';
import { useSendNewPost } from './useSendNewPost';
import { useUploadImage } from './useUploadImage';

type PropsTypes = {
  setIsLoading: (isLoading: boolean) => void;
};

export const useOnSubmit = ({ setIsLoading }: PropsTypes) => {
  const { finalImages } = useFinalImages();
  const router = useRouter();
  const { session } = useAuth();
  const uploadImage = useUploadImage();
  const sendNewPost = useSendNewPost();

  const onSubmit: SubmitHandler<PostDetails> = async ({ description }) => {
    if (!finalImages[0]?.file) {
      return;
    }

    const uuid = v4();
    const folder = `${session?.user?.id}/posts/${uuid}`;

    setIsLoading(true);

    const images = await Promise.all(
      finalImages.map(async (image) => {
        if (!image?.file) {
          return;
        }

        try {
          return await uploadImage.mutateAsync({ imageBlob: image.file, folder, isPost: true });
        } catch (error) {
          toast.error('Could not add post.');
        }
      }),
    );

    const imageUrls = images.filter((img): img is number => !!img);
    sendNewPost.mutate(
      { description, imageUrls },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: () => {
          toast.error('Could not add post.');
        },
      },
    );
  };
  return { onSubmit };
};
