import { Chat } from '@phosphor-icons/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { postItemVaraints } from '@/src/components/account-post/account-post.animation';
import { HeartIcon } from '@/src/components/heart-icon';
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

  const { commentsCount, images, isLiked, likesCount } = postData;
  const [{ url, width, height }] = images;

  return (
    <MotionLink
      shallow
      variants={postItemVaraints}
      href={`/post/${postId}`}
      className={styles.container}
      data-cy="account post link"
    >
      {!isLoaded && <Loader color="blue" size="normal" />}
      <Image
        className={clsx({ [styles.imageLoading]: !isLoaded }, styles.image)}
        src={url}
        alt=""
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        priority
      />
      <ul className={styles.overlay}>
        <li className={styles.count}>
          <HeartIcon isLiked={isLiked} /> {likesCount}
        </li>
        <li className={styles.count}>
          <Chat />
          {commentsCount}
        </li>
      </ul>
    </MotionLink>
  );
};
