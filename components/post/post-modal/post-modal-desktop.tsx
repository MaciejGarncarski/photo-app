"use client";

import { ModalCloseButton } from "@/components/buttons/modal-close-button/modal-close-button";
import { CommentForm } from "@/components/forms/comment-form/comment-form";
import { PostComments } from "@/components/post/post-comments/post-comments";
import { PostFooter } from "@/components/post/post-footer/post-footer";
import { PostHeader } from "@/components/post/post-header/post-header";
import { PostImagesCarousel } from "@/components/post/post-images-carousel/post-images-carousel";

import styles from "./post-modal.module.scss";

type Props = {
  postId: number;
  closeModal: () => void;
};

export const PostModalDesktop = ({ postId, closeModal }: Props) => {
  return (
    <>
      <div className={styles.closeButtonDesktop}>
        <ModalCloseButton onClose={closeModal} variant="secondary" />
      </div>

      <div className={styles.desktop}>
        <div className={styles.carouselDesktop}>
          <PostImagesCarousel postId={postId} priority />
        </div>
        <PostHeader postId={postId} />
        <div className={styles.commentsDesktop}>
          <PostComments postId={postId} closeModal={closeModal} />
        </div>
        <div className={styles.commentForm}>
          <PostFooter postId={postId} parentModalOpen />
          <CommentForm postId={postId} />
        </div>
      </div>
    </>
  );
};
