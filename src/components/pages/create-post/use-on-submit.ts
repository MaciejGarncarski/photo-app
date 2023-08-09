import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useSendNewPost } from '@/src/components/pages/create-post/use-send-new-post';

import { FinalImages, PostDetails } from './types';

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
