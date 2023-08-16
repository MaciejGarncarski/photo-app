import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAvatar } from '@/src/services/user.service';

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
