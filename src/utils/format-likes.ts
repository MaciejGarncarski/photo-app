export const formatCount = (likesNumber: number) => {
  const formatter = new Intl.NumberFormat('en', {
    compactDisplay: 'short',
    notation: 'compact',
  });
  return formatter.format(likesNumber).toLowerCase();
};
