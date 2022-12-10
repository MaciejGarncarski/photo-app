import { useRouter } from 'next/router';

import styles from './postButtons.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { Children } from '@/components/Layout/Layout';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
import { useAuth } from '@/components/organisms/signIn/useAuth';

type PostButtonsProps = {
  isLiked: boolean;
  likesCount: number;
  postID: number;
};

const Item = ({ children }: Children) => {
  return <li className={styles.item}>{children}</li>;
};

export const PostButtons = ({ isLiked, likesCount, postID }: PostButtonsProps) => {
  const { session } = useAuth();

  const { push } = useRouter();

  const { mutate } = usePostLike();

  const handleLike = () => {
    if (!session?.user?.id) {
      push('/auth/signin');
      return;
    }

    mutate({ isLiked, userID: session?.user?.id, postID });
  };

  return (
    <ul className={styles.list}>
      <Item>
        <button type='button' onClick={handleLike} className={styles.button}>
          {isLiked ? <Icon.HeartActive /> : <Icon.Heart />}
        </button>
        <p className={styles.count}>{likesCount}</p>
      </Item>
      <Item>
        <Icon.Comment />
      </Item>
      <Item>
        <Icon.Share />
      </Item>
    </ul>
  );
};
