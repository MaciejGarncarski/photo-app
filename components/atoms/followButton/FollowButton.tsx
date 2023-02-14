import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/button/Button';
import { useFollowMutation } from '@/components/atoms/followButton/useFollowMutation';

type FollowButtonProps = {
  userId: string;
  className?: string;
};

export const FollowButton = ({ userId, className }: FollowButtonProps) => {
  const { isFollowing } = useUser({ userId });
  const { isLoading, mutate } = useFollowMutation(userId);

  return (
    <Button className={className} onClick={() => mutate()}>
      {isLoading ? 'Loading...' : <>{isFollowing ? 'unfollow' : 'follow'}</>}
    </Button>
  );
};
