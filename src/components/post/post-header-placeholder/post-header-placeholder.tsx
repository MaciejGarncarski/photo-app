import styles from './post-header-placeholder.module.scss';

export const PostHeaderPlaceholder = () => {
  return (
    <div className={styles.placeholder}>
      <div className={styles.avatar}></div>
      <div className={styles.name}></div>
      <div className={styles.button}></div>
    </div>
  );
};
