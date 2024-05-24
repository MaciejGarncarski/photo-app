import { ArrowUp } from "@phosphor-icons/react";

import { useNewPost } from "@/components/new-post-notification/use-post-notification";

import styles from "./new-post-notification.module.scss";

export const NewPostNotification = () => {
  const { hasNewPosts, handleRefetchPosts } = useNewPost();

  return (
    <>
      {hasNewPosts && (
        <button
          type="button"
          className={styles.notification}
          onClick={handleRefetchPosts}
        >
          <ArrowUp size={20} />
          New posts
        </button>
      )}
    </>
  );
};
