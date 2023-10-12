const TIME_PERIOD = 360 * 10 * 1000;

export const checkTimeBetweenMessages = (
  date: Date | string,
  prevDate: Date | string,
) => {
  const time = new Date(date).getTime();
  const prevTime = new Date(prevDate).getTime();

  if (prevTime - time > TIME_PERIOD) {
    return true;
  }

  return false;
};
