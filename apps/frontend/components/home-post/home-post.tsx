"use client";

import { Ref } from "react";

import { usePost } from "@/components/pages/account/use-post";
import { PostFooter } from "@/components/post/post-footer/post-footer";
import { PostHeader } from "@/components/post/post-header/post-header";
import { PostImagesCarousel } from "@/components/post/post-images-carousel/post-images-carousel";

import styles from "./home-post.module.scss";

type Props = {
  postId: number;
  priority: boolean;
  ref?: Ref<HTMLElement>;
};

export const HomePost = ({ postId, priority, ref }: Props) => {
  usePost({ postId });

  return (
    <article className={styles.homePost} ref={ref}>
      <div className={styles.header}>
        <PostHeader postId={postId} />
      </div>
      <div className={styles.carousel}>
        <PostImagesCarousel postId={postId} priority={priority} />
      </div>
      <PostFooter postId={postId} />
    </article>
  );
};
