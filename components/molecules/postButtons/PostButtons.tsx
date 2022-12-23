import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import styles from './postButtons.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { Loading } from '@/components/atoms/loading/Loading';
import { Children } from '@/components/Layout/Layout';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { PostData } from '@/components/pages/collection/useCollection';

type PostButtonsProps = {
  post: PostData;
};

type ItemProps = {
  isLast?: boolean;
} & Children;

const Item = ({ children, isLast }: ItemProps) => {
  return <li className={clsx(isLast && styles.itemLast, styles.item)}>{children}</li>;
};

type ButtonProps = {
  onClick: () => void;
} & Children;

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      type='button'
      onClick={onClick}
      className={styles.button}
    >
      {children}
    </motion.button>
  );
};

export const PostButtons = ({ post }: PostButtonsProps) => {
  const { isLiked, id, isInCollection } = post;
  const { session } = useAuth();
  const { push } = useRouter();
  const { mutate } = usePostLike();
  const collectionMutation = useCollectionMutation();

  const handleLike = () => {
    if (!session?.user?.id) {
      push('/auth/signin');
      return;
    }

    mutate({ isLiked: isLiked ?? false, userID: session?.user?.id, postID: id });
  };

  const handleCollection = () => {
    if (isInCollection) {
      collectionMutation.mutate({ type: 'remove', postID: id });
      return;
    }

    collectionMutation.mutate({ type: undefined, postID: id });
  };

  return (
    <ul className={styles.list}>
      <Item>
        <Button onClick={handleLike}>{isLiked ? <Icon.HeartActive /> : <Icon.Heart />}</Button>
      </Item>
      <Item>
        <Icon.Comment />
      </Item>
      <Item>
        <Icon.Share />
      </Item>
      {session?.user && (
        <Item isLast>
          {collectionMutation.isLoading ? (
            <Loading variants={['very-small']} />
          ) : (
            <Button onClick={handleCollection}>
              {isInCollection ? <Icon.BookmarkActive /> : <Icon.Bookmark />}
            </Button>
          )}
        </Item>
      )}
    </ul>
  );
};
