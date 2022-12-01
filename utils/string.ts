export const string = (str?: string | null | Array<string>) => {
  return typeof str === 'string' ? str : '';
};
