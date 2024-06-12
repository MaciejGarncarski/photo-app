import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { getUser } from "@/services/user.service";

type Props = {
  userId: string;
};

export const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data: user } = await getUser({ userId });

      if (!user.data) {
        throw new Error("No user data.");
      }

      return user.data;
    },
    enabled: userId !== "",
    refetchOnWindowFocus: false,
  });

export const useUser = ({ userId }: Props) => {
  return useSuspenseQuery(userQueryOptions(userId));
};
