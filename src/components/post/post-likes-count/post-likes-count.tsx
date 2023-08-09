import styles from './post-likes-count.module.scss';

type Props = {
  likesCount: number;
};

export const PostLikesCount = ({ likesCount }: Props) => {
  return (
    <div>
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
