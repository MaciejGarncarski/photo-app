type Options = {
  fullMonth?: boolean;
};

export const formatDateFull = (date: Date | string, options?: Options) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: options?.fullMonth ? "long" : "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));

  return formattedDate;
};
