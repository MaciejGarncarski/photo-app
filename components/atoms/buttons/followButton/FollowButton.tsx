import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/buttons/button/Button';
import { useFollowMutation } from '@/components/atoms/buttons/followButton/useFollowMutation';
import { Loader } from '@/components/atoms/loader/Loader';

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
      {isLoading ? (
        <Loader variant="small" color={isFollowing ? 'blue' : 'white'} />
      ) : (
        <>{isFollowing ? 'unfollow' : 'follow'}</>
      )}
    </Button>
  );
};
