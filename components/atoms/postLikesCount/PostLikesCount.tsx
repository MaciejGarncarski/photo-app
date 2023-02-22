import styles from './postLikesCount.module.scss';

type PropsTypes = {
  likesCount: number;
  className?: string;
};

export const PostLikesCount = ({ likesCount, className }: PropsTypes) => {
  return (
    <div className={className}>
      <p className={styles.count}>
        {likesCount}
        &nbsp;
        {likesCount === 0 && 'likes'}
        {likesCount === 1 && 'like'}
        {likesCount > 1 && 'likes'}
      </p>
    </div>
  );
};
