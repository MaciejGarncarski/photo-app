import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import styles from './accountPost.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';

type AccountPostProps = {
  src: string;
  authorID: string;
  likesCount: number | null;
  commentsCount: number | null;
};

const overlay: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const MotionLink = motion(Link);

export const AccountPost = ({ src, likesCount, commentsCount }: AccountPostProps) => {
  return (
    <MotionLink
      shallow
      href='/post'
      initial='hidden'
      whileHover='visible'
      className={styles.container}
    >
      <Image className={styles.image} src={src} alt='' width={300} height={300} priority />
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
