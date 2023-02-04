import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Button } from '@/components/atoms/button/Button';
import { Loading } from '@/components/atoms/loading/Loading';
import { useUser } from '@/components/pages/account/useUser';

import { FollowersPutRequest } from '@/pages/api/followers';

type FollowButtonProps = {
  userId: string;
  className?: string;
};

export const FollowButton = ({ userId, className }: FollowButtonProps) => {
  const { isFollowing } = useUser({ userId });
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async () => {
      if (isFollowing) {
        await axios.delete(`/api/followers?followingUserId=${userId}`);
      }
      if (!isFollowing) {
        await axios.put<unknown, null, FollowersPutRequest>('/api/followers', {
          followingUserId: userId,
        });
      }
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['account', userId]);
      },
    },
  );

  if (isLoading) {
    return <Loading variants={['very-small']} />;
  }

  return (
    <Button className={className} onClick={() => mutate()}>
      {isFollowing ? 'unfollow' : 'follow'}
    </Button>
  );
};
