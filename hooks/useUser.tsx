import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type UseUser = {
  id: string;
};

export const useUser = ({ id }: UseUser) => {
  const user = useQuery(
    ['user'],
    async () => {
      const { data } = await axios.get(`/api/user/${id}`);
      return data;
    },
    {
      enabled: Boolean(id),
    }
  );

  return { ...user };
};
