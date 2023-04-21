import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { FinalImages, PostDetails } from './types';
import { useSendNewPost } from './useSendNewPost';

type Arguments = { finalImages: FinalImages };

export const useOnSubmit = ({ finalImages }: Arguments) => {
  const [isUploadingPost, setIsUploadingPost] = useState(false);
  const router = useRouter();
  const sendNewPost = useSendNewPost();

  const onSubmit: SubmitHandler<PostDetails> = async ({ description }) => {
    if (!finalImages[0]?.file) {
      return;
    }

    setIsUploadingPost(true);
    const finalImagesToBlob = finalImages.map((img) => img?.file || null);

    sendNewPost.mutate(
      { description, images: finalImagesToBlob },
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
  return { onSubmit, isUploadingPost };
};
