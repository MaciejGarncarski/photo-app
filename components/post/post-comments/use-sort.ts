import {
  Icon,
  SortAscending,
  SortDescending,
  Star,
} from '@phosphor-icons/react';
import { InfiniteData } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { sortComments } from '@/components/post/post-comments/sort-comments';
import { Comment } from '@/schemas/post-comment.schema';

const SORT_OPTIONS = ['newest', 'oldest', 'likes'] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

const isSortOption = (option: string): option is SortOption => {
  return Boolean(SORT_OPTIONS.find((value) => value === option));
};

type SortItem = {
  icon: Icon;
  text: string;
  value: SortOption;
};

export const radioItems: Array<SortItem> = [
  {
    icon: SortAscending,
    text: 'Newest first',
    value: 'newest',
  },
  {
    icon: SortDescending,
    text: 'Oldest first',
    value: 'oldest',
  },
  {
    icon: Star,
    text: 'Most liked first',
    value: 'likes',
  },
];

type CommentsResponse = {
  comments: Array<Comment>;
  commentsCount: number;
  totalPages: number;
  currentPage: number;
};

type Props = {
  commentsData?: InfiniteData<CommentsResponse>;
};

export const useSort = ({ commentsData }: Props) => {
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  const changeSelectedSort = (option: string) => {
    if (isSortOption(option)) {
      setSortOption(option);
      return;
    }

    setSortOption('newest');
  };

  const sortedData = useMemo(
    () =>
      commentsData?.pages
        .flatMap((pages) => pages.comments)
        .sort((a, b) => sortComments(a, b, sortOption)),
    [commentsData?.pages, sortOption],
  );

  return { changeSelectedSort, sortOption, setSortOption, sortedData };
};
