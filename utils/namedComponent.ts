export const namedComponent = async <T, N extends keyof T>(modPromise: Promise<T>, exportName: N) => {
  const mod = await modPromise;
  return mod[exportName];
};
