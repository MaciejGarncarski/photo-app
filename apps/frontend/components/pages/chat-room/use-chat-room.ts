import { useParams } from "next/navigation";

import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useUserByUsername } from "@/hooks/use-user-by-username";

import { useChatSubscription } from "@/components/pages/chat-room/use-chat-subscription";
import { useInfiniteMessages } from "@/components/pages/chat-room/use-infinite-messages";
import { useMessageForm } from "@/components/pages/chat-room/use-message-form";

export const useChatRoom = () => {
  const params = useParams();
  const username = params?.username as string;

  const { data: friendData, isPending: isUserLoading } = useUserByUsername({
    username: username,
  });

  const { isPending, fetchNextPage, hasNextPage, isError, data } =
    useInfiniteMessages({
      friendId: friendData?.userId,
    });
  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  const { form, onSubmit } = useMessageForm({ friendId: friendData?.userId });

  useChatSubscription();

  return {
    isPending,
    isUserLoading,
    data,
    friendId: friendData?.userId,
    isError: isError,
    friendData,
    hasNextPage,
    onSubmit,
    form,
    ref,
  };
};
