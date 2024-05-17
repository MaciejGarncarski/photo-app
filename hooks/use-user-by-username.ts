import { useQuery } from "@tanstack/react-query";

import { getUserByUsername } from "@/services/user.service";

type Arguments = {
  username: string;
};

export const useUserByUsername = ({ username }: Arguments) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const { data: user } = await getUserByUsername({ username });

      if (!user.data) {
        throw new Error("No user data.");
      }

      return user.data;
    },
    enabled: Boolean(username) && username !== "",
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
