import dayjs from 'dayjs';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useState } from 'react';

import styles from './homepagePost.module.scss';

import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { CommentForm } from '@/components/molecules/commentForm/CommentForm';
import { PostButtons } from '@/components/molecules/postButtons/PostButtons';
import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { descriptionData } from '@/components/organisms/homepagePost/description';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

type HomePagePostProps = {
  post: PostData;
};

export const HomepagePost = ({ post }: HomePagePostProps) => {
  const { session } = useAuth();
  const { author_id, description, created_at, images, likesCount } = post;
  const { data } = useAccount({ userId: author_id });
  const [showMore, setShowMore] = useState<boolean>(false);

  const { isDescriptionLong, hasMultipleBreaks, descriptionWithNewLine, shortDescription } =
    descriptionData(description);

  const fromNow = dayjs().to(dayjs(created_at));
  const formattedDate = dayjs(created_at).format('MMMM DD YYYY');

  const Description = () => {
    if (isDescriptionLong || hasMultipleBreaks) {
      return (
        <>
          {parse(showMore ? descriptionWithNewLine : shortDescription)}
          &nbsp;
          <button className={styles.showMore} type="button" onClick={() => setShowMore((prev) => !prev)}>
            show {showMore ? 'less' : 'more'}
          </button>
        </>
      );
    }

    return <>{parse(descriptionWithNewLine)}</>;
  };

  return (
    <article className={styles.post}>
      <PostHeader post={post} />
      <Image
        className={styles.image}
        src={images}
        width={300}
        height={300}
        priority
        alt={`${data?.user.username} - ${shortDescription}`}
      />
      <PostButtons post={post} />
      <footer className={styles.bottom}>
        {likesCount !== 0 && (
          <p className={styles.count}>
            {likesCount}
            &nbsp;
            {likesCount === 1 && 'like'}
            {likesCount > 1 && 'likes'}
          </p>
        )}
        <p className={styles.description}>
          <span className={styles.author}>{data?.user.username}</span>
          <Description />
        </p>
        <p className={styles.date}>
          <Tooltip variant="top" content={formattedDate}>
            <time dateTime={created_at.toString()}>{fromNow}</time>
          </Tooltip>
        </p>
        {session?.user && <CommentForm post={post} />}
      </footer>
    </article>
  );
};
