import { screen } from '@testing-library/react';
import { cloneElement, ReactElement } from 'react';

import { render } from '@/utils/tests/utils';

import { Input } from '@/components/molecules/input/Input';

export const snapshotComponent = (component: ReactElement) => {
  const { asFragment, getByTestId } = render(
    cloneElement(component, {
      'data-testid': 'test',
    }),
  );

  const renderedComponent = getByTestId('test');

  expect(renderedComponent).toBeDefined();
  expect(asFragment()).toMatchSnapshot();
};

describe('Input', () => {
  describe('match snapshot', () => {
    snapshotComponent(<Input labelText="random" />);
  });

  describe('Input props', () => {
    it('Should pass with label prop', () => {
      const label = 'testing label';
      render(<Input labelText={label} type="input" />);

      const input = screen.getByLabelText(label);

      expect(input).toBeInTheDocument();
    });

    it('Should pass with correct type', () => {
      const inputType = 'tel';
      render(<Input labelText="label" type={inputType} />);

      const input = screen.getByTestId('input') as HTMLInputElement;

      expect(input.type).toBe(inputType);
    });

    it('Should pass with optional text', () => {
      render(<Input labelText="label" optional />);

      const input = screen.getByLabelText(/(optional)/);
      expect(input).toBeInTheDocument();
    });
  });

  describe('Input user integration', () => {
    it('Should pass when error displayed and when has error className', () => {
      render(<Input labelText="label" optional data-testid="input" error={{ type: 'max', message: 'max error' }} />);

      const errorMessage = screen.getByText(/max error/i);

      const input = screen.getByTestId(/input/i);

      expect(errorMessage).toBeInTheDocument();
      expect(input.classList).toContain('inputError');
    });
  });
});
