import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useSendNewPost } from "@/components/pages/create-post/use-send-new-post";

import type { FinalImages, PostDetails } from "./create-post-schema";

type Arguments = { finalImages: FinalImages };

export const useOnSubmit = ({ finalImages }: Arguments) => {
  const router = useRouter();
  const sendNewPost = useSendNewPost();

  const onSubmit: SubmitHandler<PostDetails> = async ({ description }) => {
    if (!finalImages[0]?.file) {
      return;
    }

    const finalImagesToBlob = finalImages.map((img) => img?.file || null);

    toast.promise(
      sendNewPost.mutateAsync(
        { description, images: finalImagesToBlob },
        {
          onSuccess: () => {
            router.push("/");
          },
        }
      ),
      {
        loading: "Creating post...",
        success: "Post created.",
        error: "Could not add post.",
      }
    );
  };
  return {
    onSubmit,
    isError: sendNewPost.isError,
    isPending: sendNewPost.isPending,
  };
};
