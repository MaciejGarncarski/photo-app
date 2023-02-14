import { fireEvent, getByText } from '@testing-library/react';

import { render } from '@/utils/tests/utils';

import { AspectRatioButtons } from '@/components/molecules/aspectRatioButtons/AspectRatioButtons';

describe('AspectRatioButtons test', () => {
  describe('integration', () => {
    it('should change aspect ratio on click', () => {
      const setAspect = jest.fn();

      const { container } = render(<AspectRatioButtons aspect={1} setAspect={setAspect} />);

      const aspectRatioBtn = getByText(container, 'square');
      fireEvent.click(aspectRatioBtn);

      expect(aspectRatioBtn.classList).not.toContain('button-secondary');
      expect(setAspect).toHaveBeenCalled();
    });
  });
});
