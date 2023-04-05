import { useAuth } from '@/src/hooks/useAuth';
import { useUser } from '@/src/hooks/useUser';

import { Button } from '@/src/components/atoms/buttons/button/Button';

import { useFollowMutation } from '@/src/components/molecules/followButton/useFollowMutation';
import { Loader } from '@/src/components/molecules/loader/Loader';

type PropsTypes = {
  userId: string;
};

export const FollowButton = ({ userId }: PropsTypes) => {
  const { data } = useUser({ userId });
  const { isLoading, mutate } = useFollowMutation({ userId });
  const { isSignedIn } = useAuth();

  if (!isSignedIn || !data) {
    return null;
  }

  const { isFollowing } = data;

  return (
    <Button type="button" variant={isFollowing ? 'secondary' : 'primary'} onClick={() => mutate(undefined)}>
      {isLoading ? (
        <Loader size="small" color={isFollowing ? 'blue' : 'white'} />
      ) : (
        <>{isFollowing ? 'unfollow' : 'follow'}</>
      )}
    </Button>
  );
};
