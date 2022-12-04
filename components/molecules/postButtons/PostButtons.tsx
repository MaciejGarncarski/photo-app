import { useSession } from 'next-auth/react';
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt, AiTwotoneMessage } from 'react-icons/ai';

import styles from './postButtons.module.scss';

import { Children } from '@/components/Layout/Layout';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';

type PostButtonsProps = {
  isLiked: boolean;
  likesCount: number;
  postID: number;
};

export const PostButtons = ({ isLiked, likesCount, postID }: PostButtonsProps) => {
  const { data: session } = useSession();
  const Item = ({ children }: Children) => {
    return <li className={styles.item}>{children}</li>;
  };

  const { mutate } = usePostLike();

  const handleLike = () => {
    if (!session?.user?.id) {
      return;
    }

    mutate({ isLiked, userID: session?.user?.id, postID });
  };

  return (
    <ul className={styles.list}>
      <Item>
        <button type='button' onClick={handleLike} className={styles.button}>
          {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <p>{likesCount}</p>
      </Item>
      <Item>
        <AiTwotoneMessage />
      </Item>
      <Item>
        <AiOutlineShareAlt />
      </Item>
    </ul>
  );
};
