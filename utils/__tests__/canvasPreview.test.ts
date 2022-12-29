import { PixelCrop } from 'react-image-crop';

import { canvasPreview } from '@/utils/canvasPreview';

describe('canvasPreview', () => {
  it('should throw error when no context', async () => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');

    const crop: PixelCrop = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      unit: 'px',
    };

    const result = await canvasPreview(img, canvas, crop, 1);
    expect(result).toThrow(new Error('No 2d context'));
  });
});
