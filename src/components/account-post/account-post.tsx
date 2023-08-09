import { IconHeart, IconMessage2 } from '@tabler/icons-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { postItemVaraints } from '@/src/components/account-post/account-post.animation';
import { Loader } from '@/src/components/loader/loader';

import styles from './account-post.module.scss';

type Props = {
  imageUrl: string;
  width: number;
  height: number;
  isLiked: boolean;
  postId: number;
  commentsCount: number;
  likesCount: number;
};

const MotionLink = motion(Link);

export const AccountPost = ({
  likesCount,
  commentsCount,
  postId,
  isLiked,
  imageUrl,
  width,
  height,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

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
        src={imageUrl}
        alt=""
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        priority
      />
      <ul className={styles.overlay}>
        <li className={styles.count}>
          <IconHeart color={isLiked ? 'red' : 'black'} /> {likesCount}
        </li>
        <li className={styles.count}>
          <IconMessage2 /> {commentsCount}
        </li>
      </ul>
    </MotionLink>
  );
};
