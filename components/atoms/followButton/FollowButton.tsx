import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Button } from '@/components/atoms/button/Button';
import { Loading } from '@/components/atoms/loading/Loading';
import { useAccount } from '@/components/pages/account/useAccount';

import { FollowersPutRequest } from '@/pages/api/followers';

type FollowButtonProps = {
  userId: string;
  className?: string;
};

export const FollowButton = ({ userId, className }: FollowButtonProps) => {
  const { data } = useAccount({ id: userId });
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async () => {
      if (data?.isFollowing) {
        await axios.delete(`/api/followers?followingUserId=${userId}`);
      }
      if (!data?.isFollowing) {
        await axios.put<null, null, FollowersPutRequest>('/api/followers', {
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
      {data?.isFollowing ? 'unfollow' : 'follow'}
    </Button>
  );
};
