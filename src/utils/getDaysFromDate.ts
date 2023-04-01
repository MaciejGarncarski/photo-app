const ONE_HOUR = 1000 * 60 * 60;
const ONE_DAY = 1000 * 60 * 60 * 24;

export const MONTH = 30;
export const WEEK = 7;
export const DAY = 24;

export const getDaysFromDate = (date: Date) => {
  const currentTime = new Date().getTime();
  const oldTime = date.getTime();
  const hoursCount = Math.round((currentTime - oldTime) / ONE_HOUR);
  const daysCount = Math.round((currentTime - oldTime) / ONE_DAY);
  const weeksCount = Math.round(daysCount / WEEK);
  const monthsCount = Math.round(daysCount / MONTH);

  return { daysCount, weeksCount, monthsCount, hoursCount };
};
