import { IconMessage, IconShare } from '@tabler/icons';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';

import { useAuth } from '@/hooks/useAuth';
import { namedComponent } from '@/utils/namedComponent';
import { updateInfinitePostsLike } from '@/utils/updateInfinitePostsLike';

import { IconHeartWrapper } from '@/components/atoms/icons/IconHeartWrapper';
import { IconStarWrapper } from '@/components/atoms/icons/IconStarWrapper';
import { Loading } from '@/components/atoms/loading/Loading';
import { useModal } from '@/components/atoms/modal/useModal';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { Children } from '@/components/layout/Layout';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { ShareModal } from '@/components/organisms/shareModal/ShareModal';
import { PostData } from '@/components/pages/collection/useCollection';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

import styles from './postButtons.module.scss';

type PostButtonsProps = {
  post: PostData;
};

type ItemProps = {
  isLast?: boolean;
} & Children;

type ButtonProps = {
  onClick: () => void;
} & Children;

const PostModal = dynamic(() => {
  return namedComponent(import('@/components/organisms/postModal/PostModal'), 'PostModal');
});

const Item = ({ children, isLast }: ItemProps) => {
  return <li className={clsx(isLast && styles.itemLast, styles.item)}>{children}</li>;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <m.button whileTap={{ scale: 0.8 }} type="button" onClick={onClick} className={styles.button}>
      {children}
    </m.button>
  );
};

export const PostButtons = ({ post }: PostButtonsProps) => {
  const queryClient = useQueryClient();
  const { isLiked, id, isInCollection } = post;

  const { session } = useAuth();
  const { push } = useRouter();
  const { modalOpen, open, close } = useModal();
  const { modalOpen: shareModalOpen, open: openShare, close: closeShare } = useModal();
  const postLikeMutation = usePostLike();
  const collectionMutation = useCollectionMutation();

  const handleLike = () => {
    if (!session?.user?.id) {
      push('/auth/signin');
      return;
    }

    queryClient.setQueryData<InfiniteData<InfinitePosts<PostData>>>(['homepage infinite posts'], (oldData) =>
      updateInfinitePostsLike(oldData, post),
    );

    postLikeMutation.mutate({ isLiked: isLiked ?? false, userId: session?.user?.id, postId: id });
  };

  const handleCollection = () => {
    if (isInCollection) {
      collectionMutation.mutate({ type: 'remove', postId: id });
      return;
    }

    collectionMutation.mutate({ type: undefined, postId: id });
  };

  return (
    <ul className={styles.list}>
      <Item>
        <Button onClick={handleLike}>
          <span className="visually-hidden">like</span>
          {isLiked ? <IconHeartWrapper isActive /> : <IconHeartWrapper />}
        </Button>
      </Item>
      <Item>
        <Button onClick={open}>
          <span className="visually-hidden">comment</span>
          <IconMessage />
        </Button>
      </Item>
      <Item>
        <Button onClick={openShare}>
          <span className="visually-hidden">share</span>
          <IconShare />
        </Button>
      </Item>
      {session?.user && (
        <Item isLast>
          {collectionMutation.isLoading ? (
            <Loading variants={['very-small']} />
          ) : (
            <Tooltip variant="right" content={`${isInCollection ? 'Remove from' : 'Save to'} collection`}>
              <Button onClick={handleCollection}>
                {isInCollection ? <IconStarWrapper isActive /> : <IconStarWrapper />}
              </Button>
            </Tooltip>
          )}
        </Item>
      )}
      <AnimatePresence>
        {shareModalOpen && (
          <ShareModal close={closeShare} textToCopy={`https://photo-app-orpin.vercel.app/post/${id}`} />
        )}
      </AnimatePresence>
      {modalOpen &&
        createPortal(
          <AnimatePresence mode="wait">
            <PostModal post={post} close={close} />
          </AnimatePresence>,
          document.body,
        )}
    </ul>
  );
};
