import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';

import { Button } from '@/src/components/buttons/button/button';
import { useFollowMutation } from '@/src/components/buttons/follow-button/use-follow';

type Props = {
  userId: string;
};

export const FollowButton = ({ userId }: Props) => {
  const { data } = useUser({ userId });
  const { mutate } = useFollowMutation({ userId });
  const { isSignedIn } = useAuth();

  if (!isSignedIn || !data) {
    return null;
  }

  const { isFollowing } = data;
  const handleFollow = () => mutate(undefined);

  return (
    <Button
      type="button"
      variant={isFollowing ? 'secondary' : 'primary'}
      onClick={handleFollow}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
