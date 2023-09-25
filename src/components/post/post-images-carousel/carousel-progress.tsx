import { PostImage } from '@/src/services/userPosts.service';

import styles from './post-images-carousel.module.scss';

type Props = {
  currentIndex: number;
  images: Array<PostImage>;
};

export const PostSliderProgress = ({ currentIndex, images }: Props) => {
  return (
    <span className={styles.progress}>
      {currentIndex + 1}/{images.length}
    </span>
  );
};
