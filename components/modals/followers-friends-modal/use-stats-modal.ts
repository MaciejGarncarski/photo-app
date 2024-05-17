import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

import { useFollowers } from "@/components/modals/followers-friends-modal/use-followers";
import { useFriends } from "@/components/modals/followers-friends-modal/use-friends";

type Arguments = {
  userId: string;
  type: "friends" | "followers";
};

export const useStatsModal = ({ userId, type }: Arguments) => {
  const followers = useFollowers({
    userId,
    enabled: type === "followers",
  });

  const friends = useFriends({
    userId,
    enabled: type === "friends",
  });

  const currentData = type === "friends" ? friends : followers;
  const isEmpty = currentData.data?.pages[0].users.length === 0;

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(currentData.hasNextPage),
    fetchNextPage: currentData.fetchNextPage,
    enabled: true,
  });

  return {
    isEmpty,
    ref,
    isPending: currentData.isPending,
    data: currentData.data,
    hasNextPage: currentData.hasNextPage,
  };
};
