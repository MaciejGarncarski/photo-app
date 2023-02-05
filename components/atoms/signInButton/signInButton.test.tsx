import { render, screen } from '@testing-library/react';

import { SignInButton } from '@/components/atoms/signInButton/SignInButton';

describe('SignInButton', () => {
  it('Should render', () => {
    render(<SignInButton />);

    const button = screen.getByRole('link');

    expect(button).toHaveTextContent(/sign in/i);
  });
});
