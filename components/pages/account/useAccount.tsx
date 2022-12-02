import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAccount = async ({ id, username }: UseAccount) => {
  if (username) {
    const { data } = await axios.get(`/api/account/${username}?type=username`);
    return data;
  }

  const { data } = await axios.get(`/api/account/${id}`);
  return data;
};

type UseAccount = {
  username?: string;
  id?: string;
};

type UseAccountResponse = {
  status: number;
  user: User;
};

export const useAccount = ({ id, username }: UseAccount) => {
  return useQuery<UseAccountResponse>(
    ['account', id],
    () => {
      if (username) {
        return fetchAccount({ username });
      }
      return fetchAccount({ id });
    },
    {
      enabled: Boolean(id || username),
    }
  );
};
