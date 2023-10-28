import { ChatCentered, Heart } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { postItemVaraints } from '@/src/components/account-post/account-post.animation';
import { Loader } from '@/src/components/loader/loader';
import { usePost } from '@/src/components/pages/account/use-post';

import styles from './account-post.module.scss';

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
        duration: 0.15,
        ease: [0, 0.71, 0.4, 1],
        scale: {
          type: 'spring',
          damping: 7,
          stiffness: 80,
          restDelta: 0.02,
        },
      }}
    >
      {!isLoaded && (
        <span className={styles.loader}>
          <Loader color="accent" size="small" />
        </span>
      )}
      <MotionImage
        className={styles.image}
        src={images[0].url}
        alt="post"
        sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 15vw"
        fill
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
          <Heart size={34} weight="fill" />
          {likesCount}
        </span>
        <span className={styles.count}>
          <ChatCentered size={34} weight="fill" />
          {commentsCount}
        </span>
      </span>
    </MotionLink>
  );
};
