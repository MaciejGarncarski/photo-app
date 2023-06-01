import { IconMessage2 } from '@tabler/icons-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { postItemVaraints } from '@/src/components/atoms/accountPost/AccountPost.animation';
import { IconHeartWrapper } from '@/src/components/atoms/icons/IconHeartWrapper';

import { Loader } from '@/src/components/molecules/loader/Loader';

import styles from './AccountPost.module.scss';

type PropsTypes = {
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
}: PropsTypes) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <MotionLink
      shallow
      variants={postItemVaraints}
      href={`/post/${postId}`}
      className={styles.container}
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
          <IconHeartWrapper isActive={isLiked} /> {likesCount}
        </li>
        <li className={styles.count}>
          <IconMessage2 /> {commentsCount}
        </li>
      </ul>
    </MotionLink>
  );
};
