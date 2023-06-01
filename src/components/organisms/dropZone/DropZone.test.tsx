import { fireEvent, render, screen } from '@testing-library/react';

import {
  NoImageDetectedError,
  TooManyImagesError,
} from '@/src/components/atoms/cropError/CropError.data';

import { CropImage } from '@/src/components/organisms/cropImage/CropImage';
import { DropZone } from '@/src/components/organisms/dropZone/DropZone';

const inactiveText = /add image here/i;
const activeText = /drop here/i;

describe('DropZone test', () => {
  it('renders correctly', () => {
    render(<DropZone setImgSrc={jest.fn()} />);
    expect(screen.getByText(inactiveText)).toBeInTheDocument();
  });

  describe('user interaction', () => {
    it('changes text when drag over', () => {
      render(<DropZone setImgSrc={jest.fn()} />);
      const dropZone = screen.getByTestId(/dropZoneContainer/i);

      fireEvent.dragOver(dropZone);

      expect(dropZone).toHaveTextContent(activeText);
    });
    it('changes text when inactive', () => {
      render(<DropZone setImgSrc={jest.fn()} />);
      const dropZone = screen.getByTestId(/dropZoneContainer/i);
      fireEvent.dragLeave(dropZone);
      expect(dropZone).toHaveTextContent(inactiveText);
    });
    describe('file drop', () => {
      it('should show error if user somehow dropped no files', () => {
        render(<CropImage finalImages={[]} setFinalImages={jest.fn()} />);
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
        render(<CropImage finalImages={[]} setFinalImages={jest.fn()} />);
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
