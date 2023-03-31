import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/buttons/button/Button';
import { useFollowMutation } from '@/components/molecules/followButton/useFollowMutation';
import { Loader } from '@/components/molecules/loader/Loader';

type PropsTypes = {
  userId: string;
};

export const FollowButton = ({ userId }: PropsTypes) => {
  const { isFollowing } = useUser({ userId });
  const { isLoading, mutate } = useFollowMutation({ userId });
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return null;
  }

  return (
    <Button type="button" variant={isFollowing ? 'secondary' : 'primary'} onClick={() => mutate(undefined)}>
      {isLoading ? (
        <Loader variant="small" color={isFollowing ? 'blue' : 'white'} />
      ) : (
        <>{isFollowing ? 'unfollow' : 'follow'}</>
      )}
    </Button>
  );
};
