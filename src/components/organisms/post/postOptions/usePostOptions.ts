import { useAuth } from '@/src/hooks/useAuth';
import { useUser } from '@/src/hooks/useUser';

type Arguments = {
  authorId: string;
};

export const usePostOptions = ({ authorId }: Arguments) => {
  const { session } = useAuth();
  const { id, role } = useUser({ userId: session?.user?.id ?? '' });
  const isAbleToModify = authorId === id || role === 'ADMIN';

  return { isAbleToModify };
};
