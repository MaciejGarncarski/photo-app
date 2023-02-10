import { fireEvent, render, screen } from '@testing-library/react';

import { NoImageDetectedError, TooManyImagesError } from '@/components/atoms/cropError/CropError';
import { DropZone } from '@/components/atoms/dropZone/DropZone';
import { CropImage } from '@/components/molecules/cropImage/CropImage';

const inactiveText = /drag photo here/i;
const activeText = /drop here/i;

const CropImageWrapper = () => {
  return (
    <CropImage
      aspectRatio={1}
      finalImages={[undefined]}
      isCropping={false}
      setFinalImages={jest.fn()}
      setIsCropping={jest.fn()}
    />
  );
};

describe('DropZone test', () => {
  it('renders correctly', () => {
    render(<DropZone error={null} onChange={jest.fn()} setError={jest.fn()} setImgSrc={jest.fn()} />);
    expect(screen.getByText(inactiveText)).toBeInTheDocument();
  });

  describe('user interaction', () => {
    it('changes text when drag over', () => {
      render(<DropZone error={null} onChange={jest.fn()} setError={jest.fn()} setImgSrc={jest.fn()} />);
      const dropZone = screen.getByTestId(/dropZoneContainer/i);

      fireEvent.dragOver(dropZone);

      expect(dropZone).toHaveTextContent(activeText);
    });
    it('changes text when inactive', () => {
      render(<DropZone error={null} onChange={jest.fn()} setError={jest.fn()} setImgSrc={jest.fn()} />);
      const dropZone = screen.getByTestId(/dropZoneContainer/i);
      fireEvent.dragLeave(dropZone);
      expect(dropZone).toHaveTextContent(inactiveText);
    });

    describe('file drop', () => {
      it('should show error if user somehow dropped no files', () => {
        render(<CropImageWrapper />);
        const dropZone = screen.getByTestId(/dropZoneContainer/i);

        fireEvent.drop(dropZone, {
          dataTransfer: {
            files: [],
          },
        });

        const error = screen.getByText(NoImageDetectedError);
        expect(error).toBeInTheDocument();
      });

      it('should show error if user dropped more than 1 file', () => {
        render(<CropImageWrapper />);
        const dropZone = screen.getByTestId(/dropZoneContainer/i);

        const file = new File(['filefile'], 'file1.png');

        fireEvent.drop(dropZone, {
          dataTransfer: {
            files: [file, file],
          },
        });

        const error = screen.getByText(TooManyImagesError);
        expect(error).toBeInTheDocument();
      });
    });
  });
});
