import { handleDrop } from '@/utils/handleDrop';

describe('handleDrop', () => {
  it('should return undefined if no file', () => {
    const setError = jest.fn();
    const setImgSrc = jest.fn();
    const setFileName = jest.fn();

    const drop = handleDrop({
      setError,
      setFileName,
      setImgSrc,
    });

    expect(drop).toStrictEqual('NO_IMAGE_DETECTED');
  });
  it('should return undefined if more than 1 file', () => {
    const setError = jest.fn();
    const setImgSrc = jest.fn();
    const setFileName = jest.fn();

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const files = [file, file];

    const drop = handleDrop({
      setError,
      setFileName,
      setImgSrc,
      files,
    });

    expect(drop).toStrictEqual('TOO_MANY_IMAGES');
  });
  it('should call function when everything ok', () => {
    const setError = jest.fn();
    const setImgSrc = jest.fn();
    const setFileName = jest.fn();

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const files = [file];

    jest.mock('@/utils/handleDropImage.ts');

    const drop = handleDrop({
      setError,
      setFileName,
      setImgSrc,
      files,
    });

    expect(drop).toStrictEqual(undefined);
  });
});
