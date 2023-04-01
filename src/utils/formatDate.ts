import { DAY, getDaysFromDate, MONTH, WEEK } from '@/utils/getDaysFromDate';

const format = (value: number, unit: Intl.RelativeTimeFormatUnit) => {
  return new Intl.RelativeTimeFormat('en-GB').format(value, unit);
};

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const { daysCount, hoursCount, monthsCount, weeksCount } = getDaysFromDate(date);

  if (hoursCount <= DAY) {
    return format(hoursCount * -1, 'hours');
  }

  if (daysCount >= WEEK && daysCount < MONTH) {
    return format(weeksCount * -1, 'weeks');
  }

  if (daysCount >= MONTH) {
    return format(monthsCount * -1, 'months');
  }

  return format(daysCount * -1, 'days');
};
