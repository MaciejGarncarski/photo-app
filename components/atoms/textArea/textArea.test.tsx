import { render, screen } from '@testing-library/react';

import { TextArea } from '@/components/atoms/textArea/TextArea';

const getTextArea = () => screen.getByLabelText(/beer-label/i);
describe('TextArea component', () => {
  it('should display label from prop', () => {
    render(<TextArea label="beer-label" />);

    expect(getTextArea()).toBeInTheDocument();
  });
});
