import styles from './postLikesCount.module.scss';

type PropsTypes = {
  likesCount: number;
};

export const PostLikesCount = ({ likesCount }: PropsTypes) => {
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
