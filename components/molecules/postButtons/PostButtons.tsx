import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import styles from './postButtons.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { Children } from '@/components/Layout/Layout';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
import { useAuth } from '@/components/organisms/signIn/useAuth';

type PostButtonsProps = {
  isLiked: boolean;
  isInCollection: boolean;
  likesCount: number;
  postID: number;
};

type ItemProps = {
  isLast?: boolean;
} & Children;

const Item = ({ children, isLast }: ItemProps) => {
  return <li className={clsx(isLast && styles.itemLast, styles.item)}>{children}</li>;
};

export const PostButtons = ({ isLiked, likesCount, postID, isInCollection }: PostButtonsProps) => {
  const { session } = useAuth();
  const { push } = useRouter();
  const { mutate } = usePostLike();

  const handleLike = () => {
    if (!session?.user?.id) {
      push('/auth/signin');
      return;
    }

    mutate({ isLiked, userID: session?.user?.id, postID });
  };

  return (
    <ul className={styles.list}>
      <Item>
        <motion.button
          whileTap={{ scale: 0.8 }}
          type='button'
          onClick={handleLike}
          className={styles.button}
        >
          {isLiked ? <Icon.HeartActive /> : <Icon.Heart />}
        </motion.button>
        <p className={styles.count}>{likesCount}</p>
      </Item>
      <Item>
        <Icon.Comment />
      </Item>
      <Item>
        <Icon.Share />
      </Item>
      <Item isLast>{isInCollection ? <Icon.BookmarkActive /> : <Icon.Bookmark />}</Item>
    </ul>
  );
};
