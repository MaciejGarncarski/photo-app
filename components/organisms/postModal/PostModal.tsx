import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { postModalAtom } from '@/lib/state/modal';

import styles from './postModal.module.scss';

import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { Comment } from '@/components/molecules/comment/Comment';
import { dialogVariant, Modal } from '@/components/molecules/modal/Modal';
import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { useInfiniteComments } from '@/components/organisms/postModal/useInfiniteComments';
import { PostData } from '@/components/pages/collection/useCollection';

type PostModalProps = {
  post: PostData;
};

export const PostModal = ({ post }: PostModalProps) => {
  const [, setIsModalOpen] = useAtom(postModalAtom);
  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);

  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfiniteComments({
    postId: post.id,
  });

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 100px 0px',
  });

  if (!data) {
    return <Loading />;
  }

  return (
    <Modal.Overlay setOpen={setIsModalOpen}>
      <motion.div
        variants={dialogVariant}
        initial='hidden'
        animate='visible'
        exit='exit'
        role='dialog'
        className={styles.container}
      >
        <Modal.Close onClose={() => setIsModalOpen(false)} />
        <PostHeader post={post} />
        {isImgLoading && <Loading />}
        <Image
          className={clsx(isImgLoading && styles.imgLoading, styles.postImg)}
          src={post.images}
          alt='post'
          onLoad={() => setIsImgLoading(false)}
          width={200}
          height={200}
        />
        <Heading className={styles.heading} tag='h2'>
          Comments
        </Heading>
        <div className={styles.comments} ref={sentryRef}>
          {data.pages.map((page) => {
            return page.comments.map((comment) => {
              return <Comment key={comment.id} commentData={comment} />;
            });
          })}
        </div>
      </motion.div>
    </Modal.Overlay>
  );
};
