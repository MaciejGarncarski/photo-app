import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAccount = async ({ id, username }: UseAccount) => {
  if (username) {
    const { data } = await axios.get(`/api/account/${username}?type=username`);
    return data;
  }
  if (id) {
    const { data } = await axios.get(`/api/account/${id}`);
    return data;
  }
};

type UseAccount = {
  username?: string;
  id?: string;
};

type UseAccountResponse = {
  status: number;
  user: User;
  count: {
    posts: number | null;
    followers: number | null;
    following: number | null;
  };
};

export type UsernameToIdResponse = {
  message: string;
  data?: {
    id: string;
  };
};

export const useAccount = ({ id, username }: UseAccount) => {
  const query = useQuery<UseAccountResponse>({
    queryKey: [{ account: id ?? username }],
    queryFn: async () => {
      return fetchAccount({ id, username });
    },
    enabled: Boolean(id) || Boolean(username),
  });

  return {
    ...query,
    account: query.data?.user,
    count: query.data?.count,
    status: query.data?.status,
  };
};
