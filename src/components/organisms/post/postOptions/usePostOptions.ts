import { useAuth } from '@/src/hooks/useAuth';

type Arguments = {
  authorId: string;
};

export const usePostOptions = ({ authorId }: Arguments) => {
  const { sessionUser } = useAuth();
  const isAbleToModify = authorId === sessionUser?.id;

  return { isAbleToModify };
};
