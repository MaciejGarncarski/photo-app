import { render, screen } from '@testing-library/react';

import { ImagesPreview } from '@/components/molecules/imagesPreview/ImagesPreview';

describe('ImagePreview component', () => {
  it('should render one image', () => {
    render(<ImagesPreview imagesBase64={[{ id: '1', src: 'base:64//xadasdasd' }]} onRemove={jest.fn()} />);
    expect(screen.getByText(/remove image/i)).toBeInTheDocument();
  });
});
