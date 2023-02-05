import { screen } from '@testing-library/react';

import { render } from '@/utils/tests/utils';

import { Input } from '@/components/molecules/input/Input';

describe('Input', () => {
  it('Should display label', () => {
    const label = 'testing label';
    render(<Input labelText={label} type="input" />);

    const input = screen.getByLabelText(label);

    expect(input).toBeInTheDocument();
  });

  it('Should have correct type', () => {
    const inputType = 'tel';

    render(<Input labelText="label" type={inputType} />);

    const input = screen.getByTestId('input') as HTMLInputElement;

    expect(input.type).toBe(inputType);
  });

  it('Should render with optional text', () => {
    render(<Input labelText="label" optional />);

    const input = screen.getByLabelText(/(optional)/);

    expect(input).toBeInTheDocument();
  });
});
