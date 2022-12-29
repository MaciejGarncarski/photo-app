import { render, screen } from '@testing-library/react';

import {
  CropError,
  DimensionError,
  FileSizeError,
  InvalidTypeError,
  NoImageDetectedError,
  TooManyImagesError,
} from '@/components/atoms/cropError/CropError';

describe('<CropError />', () => {
  it('should display dimension error', async () => {
    render(<CropError errorType='DIMENSIONS' />);
    const error = await screen.findByText(DimensionError);
    expect(error).toBeInTheDocument();
  });
  it('should display file size error', async () => {
    render(<CropError errorType='FILE_SIZE' />);
    const error = await screen.findByText(FileSizeError);
    expect(error).toBeInTheDocument();
  });
  it('should display invalid type error', async () => {
    render(<CropError errorType='INVALID_TYPE' />);
    const error = await screen.findByText(InvalidTypeError);
    expect(error).toBeInTheDocument();
  });
  it('should display no image detected error', async () => {
    render(<CropError errorType='NO_IMAGE_DETECTED' />);
    const error = await screen.findByText(NoImageDetectedError);
    expect(error).toBeInTheDocument();
  });
  it('should display too many images error', async () => {
    render(<CropError errorType='TOO_MANY_IMAGES' />);
    const error = await screen.findByText(TooManyImagesError);
    expect(error).toBeInTheDocument();
  });
});
