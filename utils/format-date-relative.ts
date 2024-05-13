import { getCountFromDate } from '@/utils/get-count-from-date';

const formatter = new Intl.RelativeTimeFormat('en-GB', {
  style: 'narrow',
  numeric: 'auto',
});

export const formatDateRelative = (dateString: Date | string) => {
  const date = new Date(dateString);
  const { hoursCount, minutesCount, secondsCount } = getCountFromDate(date);

  if (minutesCount < 0) {
    return formatter.format(secondsCount * -1, 'seconds');
  }

  if (minutesCount <= 60) {
    return formatter.format(minutesCount * -1, 'minutes');
  }

  if (hoursCount <= 24) {
    return formatter.format(hoursCount * -1, 'hours');
  }

  const currentYear = new Date().getFullYear();

  if (currentYear === date.getFullYear()) {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
