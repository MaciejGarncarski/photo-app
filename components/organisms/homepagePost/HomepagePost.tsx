import parse from 'html-react-parser';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';

import styles from './homepagePost.module.scss';

import { CommentForm } from '@/components/molecules/commentForm/CommentForm';
import { PostButtons } from '@/components/molecules/postButtons/PostButtons';
import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { descriptionData } from '@/components/organisms/homepagePost/description';
import { useAccount } from '@/components/pages/account/useAccount';

type HomePagePostProps = {
  images: string;
  description: string;
  isInCollection: boolean;
  isLiked: boolean;
  postID: number;
  authorID: string;
  likesCount: number;
  createdAt: Date;
};

export const HomepagePost = ({
  images,
  authorID,
  description,
  isInCollection,
  likesCount,
  postID,
  isLiked,
  createdAt,
}: HomePagePostProps) => {
  const { data } = useAccount({ id: authorID });

  const [showMore, setShowMore] = useState<boolean>(false);

  const { isDescriptionLong, hasMultipleBreaks, descriptionWithNewLine, shortDescription } =
    descriptionData(description);

  const fromNow = moment(createdAt).fromNow();

  const Description = () => {
    if (isDescriptionLong || hasMultipleBreaks) {
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

  return (
    <article className={styles.post}>
      <PostHeader user={data.user} postID={postID} />
      <Image
        className={styles.image}
        src={images}
        width={300}
        height={300}
        alt={`${data.user.username} - ${shortDescription}`}
      />
      <PostButtons
        isInCollection={isInCollection}
        likesCount={likesCount}
        postID={postID}
        isLiked={isLiked}
      />
      <footer className={styles.bottom}>
        <p className={styles.description}>
          <span className={styles.author}>{data.user.username}</span>
          <Description />
        </p>
        <p>{fromNow}</p>
        <CommentForm postID={postID} />
      </footer>
    </article>
  );
};
