'use client';

import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { CommentForm } from '@/src/components/forms/comment-form/comment-form';
import { PostComments } from '@/src/components/post/post-comments/post-comments';
import { PostFooter } from '@/src/components/post/post-footer/post-footer';
import { PostHeader } from '@/src/components/post/post-header/post-header';
import { PostImagesCarousel } from '@/src/components/post/post-images-carousel/post-images-carousel';

import styles from './post-modal.module.scss';

type Props = {
  postId: number;
  closeModal: () => void;
};

export const PostModalDesktop = ({ postId, closeModal }: Props) => {
  return (
    <>
      <div className={styles.closeButtonDesktop}>
        <ModalCloseButton onClose={closeModal} />
      </div>

      <div className={styles.desktop}>
        <div className={styles.carouselDesktop}>
          <PostImagesCarousel postId={postId} priority />
        </div>
        <PostHeader postId={postId} />
        <div className={styles.commentsDesktop}>
          <PostComments postId={postId} />
        </div>
        <div className={styles.commentForm}>
          <PostFooter postId={postId} parentModalOpen />
          <CommentForm postId={postId} />
        </div>
      </div>
    </>
  );
};
