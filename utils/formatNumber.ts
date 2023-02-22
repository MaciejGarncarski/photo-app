const helper = (count: number, number: number, end: string) => {
  if (count >= number) {
    if (count % number === 0) {
      return `${count / number}${end}`;
    }

    return `${(count / number).toFixed(1)}${end}`;
  }
};

export const formatNumber = (count: number) => {
  if (count >= 1000000) {
    return helper(count, 1000000, 'm');
  }

  if (count >= 1000) {
    return helper(count, 1000, 'k');
  }

  return count;
};
