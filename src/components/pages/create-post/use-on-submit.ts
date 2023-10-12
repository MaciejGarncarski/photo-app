import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { useSendNewPost } from '@/src/components/pages/create-post/use-send-new-post';

import { FinalImages, PostDetails } from './types';

type Arguments = { finalImages: FinalImages };

export const useOnSubmit = ({ finalImages }: Arguments) => {
  const [isUploadingPost, setIsUploadingPost] = useState(false);
  const router = useRouter();
  const sendNewPost = useSendNewPost();
  const toastRef = useRef<number | string | null>(null);

  const onSubmit: SubmitHandler<PostDetails> = async ({ description }) => {
    if (!finalImages[0]?.file) {
      return;
    }

    setIsUploadingPost(true);
    const finalImagesToBlob = finalImages.map((img) => img?.file || null);

    toastRef.current = toast.loading('Uploading post...');

    sendNewPost.mutate(
      { description, images: finalImagesToBlob },
      {
        onSuccess: () => {
          if (toastRef.current) {
            toast.dismiss(toastRef.current);
            toastRef.current = null;
            toast.success('Post created!');
          }

          router.push('/');
        },
        onError: () => {
          if (toastRef.current) {
            toast.dismiss(toastRef.current);
            toastRef.current = null;
          }
          toast.error('Could not add post.');
        },
      },
    );
  };
  return { onSubmit, isUploadingPost, isError: sendNewPost.isError };
};
