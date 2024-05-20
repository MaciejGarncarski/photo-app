import { useInfiniteQuery } from "@tanstack/react-query";

import { nextPageParam } from "@/utils/api/next-page-param";

import { getChatMessages } from "@/services/chat.service";

type Props = {
  friendId?: string;
};

export const useInfiniteMessages = ({ friendId }: Props) => {
  return useInfiniteQuery({
    queryKey: ["chatMessages", friendId],
    queryFn: async ({ pageParam }) => {
      if (!friendId) {
        throw new Error("No friend id.");
      }

      const { data } = await getChatMessages({
        skip: pageParam.toString(),
        receiverId: friendId,
      });

      return data.data;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    enabled: Boolean(friendId),
    getNextPageParam: nextPageParam,
    staleTime: Number.POSITIVE_INFINITY,
  });
};
