export const formatDateFull = (date: Date | string) => {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(date));

  return formattedDate;
};
