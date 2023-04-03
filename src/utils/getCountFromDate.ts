const ONE_HOUR = 1000 * 60 * 60;

export const MONTH = 30;
export const WEEK = 7;
export const DAY = 24;
export const HOUR = 60;

export const getCountFromDate = (date: Date) => {
  const currentTime = new Date().getTime();
  const oldTime = date.getTime();
  const minutesCount = Math.round((currentTime - oldTime) / (ONE_HOUR / 60));
  const hoursCount = Math.round((currentTime - oldTime) / ONE_HOUR);
  const daysCount = Math.round(hoursCount / DAY);
  const weeksCount = Math.round(daysCount / WEEK);
  const monthsCount = Math.round(daysCount / MONTH);

  return { daysCount, weeksCount, monthsCount, hoursCount, minutesCount };
};
