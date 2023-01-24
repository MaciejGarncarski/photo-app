export const aspectRatio = (width: number, height: number) => {
  const aspect = width / height;

  if (aspect < 1) {
    return 'portrait';
  }

  if (aspect === 1) {
    return 'square';
  }

  if (aspect > 1) {
    return 'landscape';
  }

  return 'square';
};
