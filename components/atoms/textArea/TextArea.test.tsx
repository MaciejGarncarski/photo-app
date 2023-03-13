import { render, screen } from '@testing-library/react';

import { TextArea } from '@/components/atoms/textArea/TextArea';

describe('TextArea component', () => {
  describe('props', () => {
    it('should display label', () => {
      render(<TextArea label="beer-label" />);
      expect(screen.getByLabelText(/beer-label/i)).toBeInTheDocument();
    });
  });
});
