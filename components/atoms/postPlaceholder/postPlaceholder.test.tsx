import { render, screen } from '@testing-library/react';

import { PostPlaceholder } from '@/components/atoms/postPlaceholder/PostPlaceholder';

describe('PostPlaceholder', () => {
  it('Should render', () => {
    render(<PostPlaceholder />);
    const placeholder = screen.getByRole('status');
    expect(placeholder).toBeInTheDocument();
  });
});
