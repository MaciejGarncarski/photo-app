import { Button } from '@/components/atoms/button/Button';

type FollowButtonProps = {
  isFollowing: boolean;
  className?: string;
};

export const FollowButton = ({ isFollowing, className }: FollowButtonProps) => {
  return <Button className={className}>{isFollowing ? 'unfollow' : 'follow'}</Button>;
};
