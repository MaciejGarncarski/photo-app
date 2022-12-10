import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type UseCollection = {
  userID: string;
};

export const useCollection = ({ userID }: UseCollection) => {
  return useQuery(['collection', userID], async () => {
    const { data } = await axios.get(`/api/collection?user=${userID}`);
    return data;
  });
};
