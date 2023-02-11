import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/button/Button';
import { useFollowMutation } from '@/components/atoms/followButton/useFollowMutation';
import { Loading } from '@/components/atoms/loading/Loading';

type FollowButtonProps = {
  userId: string;
  className?: string;
};

export const FollowButton = ({ userId, className }: FollowButtonProps) => {
  const { isFollowing } = useUser({ userId });
  const { isLoading, mutate } = useFollowMutation(userId);

  if (isLoading) {
    return <Loading variants={['very-small']} />;
  }

  return (
    <Button className={className} onClick={() => mutate()}>
      {isFollowing ? 'unfollow' : 'follow'}
    </Button>
  );
};
