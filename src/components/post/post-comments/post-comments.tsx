import { CaretDown } from '@phosphor-icons/react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { Comment } from '@/src/components/comment/comment';
import { DropdownContent } from '@/src/components/dropdown/dropdown-content/dropdown-content';
import { Loader } from '@/src/components/loader/loader';
import { useInfiniteComments } from '@/src/components/post/post-comments/use-infinite-comments';
import {
  radioItems,
  useSort,
} from '@/src/components/post/post-comments/use-sort';

import styles from './post-comments.module.scss';

type Props = {
  postId: number;
};

export const PostComments = ({ postId }: Props) => {
  const { data, hasNextPage, fetchNextPage, isPending } = useInfiniteComments({
    postId: postId,
  });

  const [isOpen, setIsOpen] = useState(false);

  const { sortOption, changeSelectedSort, sortedData } = useSort({
    commentsData: data,
  });

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  if (!data || !sortedData) {
    return null;
  }

  const commentsCount = data.pages[0].commentsCount;

  return (
    <div className={styles.commentsList}>
      {commentsCount === 0 ? (
        <p className={styles.noComments}>No comments added yet.</p>
      ) : (
        <>
          <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dropdown.Trigger asChild>
              <button type="button" className={styles.sort}>
                {
                  radioItems.find((sortItem) => sortItem.value === sortOption)
                    ?.text
                }
                <motion.span
                  animate={{
                    rotate: isOpen ? 180 : 0,
                  }}
                >
                  <CaretDown size={20} />
                </motion.span>
              </button>
            </Dropdown.Trigger>
            <Dropdown.Portal>
              <DropdownContent>
                <Dropdown.RadioGroup
                  onValueChange={changeSelectedSort}
                  className={styles.radioGroup}
                >
                  {radioItems.map(({ text, value, icon: Icon }) => {
                    return (
                      <Dropdown.RadioItem
                        key={value}
                        value={value}
                        disabled={sortOption === value}
                        className={styles.radioItem}
                      >
                        <Icon weight="fill" size={20} />
                        {text}
                      </Dropdown.RadioItem>
                    );
                  })}
                </Dropdown.RadioGroup>
              </DropdownContent>
            </Dropdown.Portal>
          </Dropdown.Root>
          {sortedData.map((comment) => {
            return <Comment key={comment.commentId} commentData={comment} />;
          })}
        </>
      )}
      {hasNextPage && !isPending && (
        <span ref={ref}>
          <Loader color="accent" size="small" />
        </span>
      )}
    </div>
  );
};
