import { IconMessage2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { PostData } from '@/utils/apis/transformPost';

import { postItemVaraints } from '@/components/atoms/accountPost/AccountPost.animation';

import styles from './accountPost.module.scss';

import { IconHeartWrapper } from '../icons/IconHeartWrapper';

type PropsTypes = {
  post: PostData;
};

const MotionLink = motion(Link);

export const AccountPost = ({ post }: PropsTypes) => {
  const { imagesData, likesCount, commentsCount, postId, isLiked } = post;

  if (!imagesData[0]) {
    return null;
  }

  const { url, width, height } = imagesData[0];

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
