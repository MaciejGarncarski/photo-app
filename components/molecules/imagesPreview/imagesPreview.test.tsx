import { fireEvent, render, screen } from '@testing-library/react';

import { ImagesPreview } from '@/components/molecules/imagesPreview/ImagesPreview';
import { snapshotComponent } from '@/components/molecules/input/input.test';

const img =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII';

describe('Images preview', () => {
  describe('match snapshot', () => {
    snapshotComponent(<ImagesPreview imagesBase64={[undefined]} onRemove={jest.fn()} />);
  });
  describe('User integration', () => {
    it('Should detect onRemove', () => {
      const onRemove = jest.fn();
      render(
        <ImagesPreview
          imagesBase64={[
            {
              id: 0,
              src: img,
            },
          ]}
          onRemove={onRemove}
        />,
      );

      const imageDeleteBtn = screen.getByText(/remove image/);

      fireEvent.click(imageDeleteBtn);

      expect(onRemove).toHaveBeenCalled();
    });
  });
});
