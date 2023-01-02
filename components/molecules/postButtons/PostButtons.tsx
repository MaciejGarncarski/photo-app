import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';

import { postIdOfModalAtom, postModalAtom } from '@/lib/state/modal';

import styles from './postButtons.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { Loading } from '@/components/atoms/loading/Loading';
import { Children } from '@/components/Layout/Layout';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { PostModal } from '@/components/organisms/postModal/PostModal';
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
    <motion.button whileTap={{ scale: 0.8 }} type="button" onClick={onClick} className={styles.button}>
      {children}
    </motion.button>
  );
};

export const PostButtons = ({ post }: PostButtonsProps) => {
  const { isLiked, id, isInCollection } = post;
  const [isModalOpen, setModalOpen] = useAtom(postModalAtom);
  const [postId, setPostId] = useAtom(postIdOfModalAtom);

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

  const openModal = () => {
    setModalOpen((prev) => !prev);
    setPostId(post.id);
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
        <Button onClick={openModal}>
          <Icon.Comment />
        </Button>
      </Item>
      <Item>
        <Icon.Share />
      </Item>
      {session?.user && (
        <Item isLast>
          {collectionMutation.isLoading ? (
            <Loading variants={['very-small']} />
          ) : (
            <Button onClick={handleCollection}>{isInCollection ? <Icon.BookmarkActive /> : <Icon.Bookmark />}</Button>
          )}
        </Item>
      )}
      {isModalOpen &&
        postId === post.id &&
        createPortal(
          <AnimatePresence>
            <PostModal post={post} />
          </AnimatePresence>,
          document.body,
        )}
    </ul>
  );
};
