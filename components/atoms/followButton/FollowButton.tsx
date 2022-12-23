import { Button } from '@/components/atoms/button/Button';
import { Loading } from '@/components/atoms/loading/Loading';

type FollowButtonProps = {
  isFollowing: boolean;
  className?: string;
};

export const FollowButton = ({ isFollowing, className }: FollowButtonProps) => {
  const isLoading = false;
  if (isLoading) {
    return <Loading variants={['very-small']} />;
  }

  return <Button className={className}>{isFollowing ? 'unfollow' : 'follow'}</Button>;
};
