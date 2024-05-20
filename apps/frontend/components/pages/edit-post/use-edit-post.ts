import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { editPost } from "@/services/posts.service";

type Mutation = {
  description: string;
};

export const useEditPost = ({ postId }: { postId: number }) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ description }: Mutation) => {
      return editPost({ description, postId: postId.toString() });
    },
    onSuccess: () => router.push(`/post/${postId}`),
  });
};
