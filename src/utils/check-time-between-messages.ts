const TIME_PERIOD = 360 * 10 * 1000;

export const checkTimeBetweenMessages = (date: Date, prevDate: Date) => {
  const time = date.getTime();
  const prevTime = prevDate.getTime();

  if (prevTime - time > TIME_PERIOD) {
    return true;
  }

  return false;
};
