import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import styles from './accountPost.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { PostData } from '@/components/pages/collection/useCollection';

type AccountPostProps = {
  post: PostData;
};

const overlay: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const MotionLink = motion(Link);

export const AccountPost = ({ post }: AccountPostProps) => {
  const { images, likesCount, commentsCount, id } = post;

  return (
    <MotionLink
      shallow
      href={`/post/${id}`}
      initial='hidden'
      whileHover='visible'
      transition={{ type: 'tween', duration: 0.15 }}
      className={styles.container}
    >
      <Image className={styles.image} src={images} alt='' width={300} height={300} priority />
      <motion.div variants={overlay} className={styles.overlay}>
        <p className={styles.count}>
          <Icon.Heart /> {likesCount}
        </p>
        <p className={styles.count}>
          <Icon.Comment /> {commentsCount}
        </p>
      </motion.div>
    </MotionLink>
  );
};
