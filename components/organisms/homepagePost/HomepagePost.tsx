import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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
const LONG_DESCRIPTION = 50;

export const HomepagePost = ({
  images,
  authorID,
  description,
  likesCount,
  postID,
  isLiked,
}: HomePagePostProps) => {
  const { session } = useAuth();
  const { data } = useAccount({ id: authorID });

  const [showMore, setShowMore] = useState<boolean>(false);

  const descriptionWithNewLine = description.replace(/\r?\n/g, '<br />');
  const isDescriptionLong = description.length >= LONG_DESCRIPTION;
  const shortDescription = description.slice(0, LONG_DESCRIPTION) + '...';

  const Description = () => {
    if (isDescriptionLong) {
      return (
        <>
          {parse(showMore ? descriptionWithNewLine : shortDescription)}
          &nbsp;
          <button
            className={styles.showMore}
            type='button'
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? 'less' : 'more'}
          </button>
        </>
      );
    }

    return <>{parse(descriptionWithNewLine)}</>;
  };

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
      <Image
        className={styles.image}
        src={images}
        width={300}
        height={300}
        alt={`${data.user.username} - ${shortDescription}`}
      />
      {/* <img
        src='s'
        className={styles.image}
        alt={`${data.user.username} - ${shortDescription}`}
        width={300}
        height={300}
      /> */}
      <PostButtons likesCount={likesCount} postID={postID} isLiked={isLiked} />

      <div className={styles.bottom}>
        <div className={styles.description}>
          <p>
            <span className={styles.author}>{data.user.username}</span>
            <Description />
          </p>
        </div>
        <div>info</div>
        <div>addcommentdesktop</div>
      </div>
    </article>
  );
};
