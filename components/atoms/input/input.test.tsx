import { screen } from '@testing-library/react';

import { render } from '@/utils/tests/utils';

import { Input } from '@/components/atoms/input/Input';

describe('Input', () => {
  describe('integration', () => {
    it('Should pass when error displayed and when has error className', () => {
      render(<Input labelText="label" optional error="max error" />);
      const errorMessage = screen.getByText(/max error/i);
      const input = screen.getByTestId(/input/i);
      expect(errorMessage).toBeInTheDocument();
      expect(input.classList).toContain('inputError');
    });
  });
});
