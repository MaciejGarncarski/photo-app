import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';

import { Button } from '@/src/components/buttons/button/button';
import { useFollowMutation } from '@/src/components/buttons/follow-button/use-follow';
import { Loader } from '@/src/components/loader/loader';

type Props = {
  userId: string;
};

export const FollowButton = ({ userId }: Props) => {
  const { data } = useUser({ userId });
  const { isPending, mutate } = useFollowMutation({ userId });
  const { isSignedIn } = useAuth();

  if (!isSignedIn || !data) {
    return null;
  }

  const { isFollowing } = data;
  const handleFollow = () => mutate({ isFollowing, userId });

  return (
    <Button
      type="button"
      disabled={isPending}
      variant={isFollowing ? 'secondary' : 'primary'}
      onClick={handleFollow}
    >
      {isPending ? (
        <Loader size="small" color={isFollowing ? 'blue' : 'white'} />
      ) : (
        <span>{isFollowing ? 'unfollow' : 'follow'}</span>
      )}
    </Button>
  );
};
