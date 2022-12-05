import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';

import styles from './homepagePost.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { PostButtons } from '@/components/molecules/postButtons/PostButtons';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

type HomePagePostProps = {
  images: string;
  description: string;
  isLiked: boolean;
  postID: number;
  authorID: string;
  likesCount: number;
};

const AVATAR_SIZE = 40;

export const HomepagePost = ({
  images,
  authorID,
  description,
  likesCount,
  postID,
  isLiked,
}: HomePagePostProps) => {
  const { session, status } = useAuth();

  const { data } = useAccount({ id: authorID });

  if (!data) {
    return null;
  }
  const isAbleToOpenOptions = data.user.id === session?.user?.id;

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <Link href={`/${data.user.username}`} className={styles.link}>
          <Avatar userID={data.user.id} width={AVATAR_SIZE} height={AVATAR_SIZE} alt='' />
          <h2>{data.user.username}</h2>
        </Link>
        <div className={styles.options}>
          <FollowButton className={styles.followBtn} isFollowing={false} />
          {isAbleToOpenOptions && <AiOutlineMenu />}
        </div>
      </header>
      <Image className={styles.image} src={images} width={300} height={300} alt='' />
      <PostButtons likesCount={likesCount} postID={postID} isLiked={isLiked} />
      <div>{description}</div>
      <div>info</div>
      <div>addcommentdesktop</div>
    </article>
  );
};
