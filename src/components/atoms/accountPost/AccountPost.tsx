import { IconMessage2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { postItemVaraints } from '@/src/components/atoms/accountPost/AccountPost.animation';
import { IconHeartWrapper } from '@/src/components/atoms/icons/IconHeartWrapper';

import styles from './accountPost.module.scss';

export type PostImage = {
  id: number;
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number;
};

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

export const AccountPost = ({ likesCount, commentsCount, postId, isLiked, imageUrl, width, height }: PropsTypes) => {
  return (
    <MotionLink shallow variants={postItemVaraints} href={`/post/${postId}`} className={styles.container}>
      <Image className={styles.image} src={imageUrl} alt="" width={width} height={height} priority />
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
