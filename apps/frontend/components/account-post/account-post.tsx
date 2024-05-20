import { ChatCentered, CopySimple, Heart } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { postItemVaraints } from "@/components/account-post/account-post.animation";
import { Loader } from "@/components/loader/loader";
import { usePost } from "@/components/pages/account/use-post";

import styles from "./account-post.module.scss";

type Props = {
  postId: number;
};

const MotionLink = motion(Link);
const MotionImage = motion(Image);

export const AccountPost = ({ postId }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: postData } = usePost({ postId });

  if (!postData) {
    return null;
  }

  const { commentsCount, images, likesCount } = postData;

  const imagesLength = images.length;

  if (!images[0]) {
    return null;
  }

  return (
    <MotionLink
      shallow
      href={`/post/${postId}`}
      className={styles.link}
      data-cy="account post link"
      variants={postItemVaraints}
      initial="hidden"
      animate="show"
      transition={{
        ease: [0, 0.8, 0.2, 1],
        scale: {
          type: "spring",
          damping: 8,
          stiffness: 80,
          restDelta: 0.001,
        },
      }}
    >
      {!isLoaded && (
        <span className={styles.loader} role="status">
          <Loader color="accent" size="small" />
        </span>
      )}
      {imagesLength > 1 ? (
        <span className={styles.manyPhotosIcon}>
          <CopySimple weight="fill" size={40} />
        </span>
      ) : null}

      <MotionImage
        className={styles.image}
        src={images[0].url}
        alt="post"
        sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 15vw"
        fill
        quality={100}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isLoaded ? 1 : 0,
        }}
        onLoad={() => setIsLoaded(true)}
        priority
      />
      <span className={styles.overlay}>
        <span className={styles.count}>
          <Heart size={28} weight="fill" />
          {likesCount}
        </span>
        <span className={styles.count}>
          <ChatCentered size={28} weight="fill" />
          {commentsCount}
        </span>
      </span>
    </MotionLink>
  );
};
