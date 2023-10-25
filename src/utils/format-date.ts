import {
  DAY,
  getCountFromDate,
  HOUR,
  MONTH,
  WEEK,
} from '@/src/utils/get-count-from-date';

type FormatData = Array<{
  condition: boolean;
  value: number;
  name: Intl.RelativeTimeFormatUnit;
}>;

const formatter = new Intl.RelativeTimeFormat('en-GB', {
  style: 'short',
  numeric: 'auto',
});

export const formatDate = (dateString: Date | string) => {
  const date = new Date(dateString);
  const { daysCount, hoursCount, minutesCount, monthsCount, weeksCount } =
    getCountFromDate(date);

  const formatData = [
    {
      condition: minutesCount < HOUR,
      value: minutesCount,
      name: 'minutes',
    },
    {
      condition: hoursCount <= DAY,
      value: hoursCount,
      name: 'hours',
    },
    {
      condition: daysCount >= WEEK && daysCount < MONTH,
      value: weeksCount,
      name: 'weeks',
    },
    {
      condition: daysCount >= MONTH,
      value: monthsCount,
      name: 'months',
    },
  ] satisfies FormatData;

  if (minutesCount === 0) {
    return 'now';
  }

  const foundItem = formatData.find(({ condition }) => condition);

  if (foundItem) {
    return formatter.format(foundItem.value * -1, foundItem.name);
  }

  return formatter.format(daysCount * -1, 'days');
};
