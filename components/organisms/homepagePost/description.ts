const LONG_DESCRIPTION = 50;

export const descriptionData = (description: string) => {
  const descriptionWithNewLine = description.replace(/\r?\n/g, '<br />');
  const isDescriptionLong = description.length >= LONG_DESCRIPTION;
  const shortDescription = description.slice(0, LONG_DESCRIPTION) + '...';

  return {
    descriptionWithNewLine,
    isDescriptionLong,
    shortDescription,
  };
};
