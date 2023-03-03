import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/button/Button';
import { useFollowMutation } from '@/components/atoms/followButton/useFollowMutation';

type PropsTypes = {
  userId: string;
  className?: string;
};

export const FollowButton = ({ userId, className }: PropsTypes) => {
  const { isFollowing } = useUser({ userId });
  const { isLoading, mutate } = useFollowMutation(userId);
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return null;
  }

  return (
    <Button className={className} variant={isFollowing ? 'secondary' : undefined} onClick={() => mutate()}>
      {isLoading ? 'Loading...' : <>{isFollowing ? 'unfollow' : 'follow'}</>}
    </Button>
  );
};
