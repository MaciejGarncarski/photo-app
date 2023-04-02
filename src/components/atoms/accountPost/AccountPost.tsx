import { IconMessage2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { PostData } from '@/src/utils/apis/transformPost';

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
  post: PostData;
  image: PostImage;
};

const MotionLink = motion(Link);

export const AccountPost = ({ post, image }: PropsTypes) => {
  const { likesCount, commentsCount, postId, isLiked } = post;
  const { url, width, height } = image;

  return (
    <MotionLink shallow variants={postItemVaraints} href={`/post/${postId}`} className={styles.container}>
      <Image className={styles.image} src={url} alt="" width={width} height={height} priority />
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
