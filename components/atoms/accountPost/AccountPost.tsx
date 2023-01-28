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
  const { images, likesCount, commentsCount, id, image1 } = post;

  const hasOneImage = typeof images != 'undefined' && images;
  const hasMultipleImages = typeof image1 != 'undefined' && image1;

  if (!images && !image1) {
    return null;
  }

  return (
    <MotionLink
      shallow
      href={`/post/${id}`}
      initial="hidden"
      whileHover="visible"
      transition={{ type: 'tween', duration: 0.15 }}
      className={styles.container}
    >
      {hasOneImage && <Image className={styles.image} src={images} alt="" width={300} height={300} priority />}
      {hasMultipleImages && <Image className={styles.image} src={image1} alt="" width={300} height={300} priority />}
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
