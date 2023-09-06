import { Chat, Heart } from '@phosphor-icons/react';
import clsx from 'clsx';
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

export const AccountPost = ({ postId }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: postData } = usePost({ postId });

  if (!postData) {
    return null;
  }

  const { commentsCount, images, likesCount } = postData;
  const [{ url, width, height }] = images;

  return (
    <MotionLink
      shallow
      variants={postItemVaraints}
      href={`/post/${postId}`}
      className={styles.link}
      data-cy="account post link"
    >
      {!isLoaded && <Loader color="accent" size="small" />}
      <Image
        className={clsx({ [styles.imageLoading]: !isLoaded }, styles.image)}
        src={url}
        alt=""
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        priority
      />
      <span className={styles.overlay}>
        <span className={styles.count}>
          <Heart size={34} />
          {likesCount}
        </span>
        <span className={styles.count}>
          <Chat size={34} />
          {commentsCount}
        </span>
      </span>
    </MotionLink>
  );
};
