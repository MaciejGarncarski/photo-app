import { screen } from '@testing-library/react';

import { render } from '@/utils/tests/utils';

import { FollowButton } from '@/components/atoms/followButton/FollowButton';

describe('FollowButton test', () => {
  it('should render follow button', () => {
    render(<FollowButton userId="user" />);

    const button = screen.getByText(/follow/i);
    expect(button).toBeInTheDocument();
  });
});
