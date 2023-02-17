import { IconHeart, IconMessage } from '@tabler/icons';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { PostData } from '@/components/pages/collection/useCollection';

import styles from './accountPost.module.scss';

type AccountPostProps = {
  post: PostData;
};

const overlay: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const MotionLink = motion(Link);

export const AccountPost = ({ post }: AccountPostProps) => {
  const { imagesData, likesCount, commentsCount, postId } = post;

  if (!imagesData[0]) {
    return null;
  }

  const { url, width, height } = imagesData[0];

  return (
    <MotionLink
      shallow
      href={`/post/${postId}`}
      initial="hidden"
      whileHover="visible"
      transition={{ type: 'tween', duration: 0.15 }}
      className={styles.container}
    >
      <Image className={styles.image} src={url} alt="" width={width} height={height} priority />
      <motion.div variants={overlay} className={styles.overlay}>
        <p className={styles.count}>
          <IconHeart /> {likesCount}
        </p>
        <p className={styles.count}>
          <IconMessage /> {commentsCount}
        </p>
      </motion.div>
    </MotionLink>
  );
};
