import { getByText } from '@testing-library/react';

import { render } from '@/utils/tests/utils';

import { FollowButton } from '@/components/atoms/followButton/FollowButton';

describe('FollowButton test', () => {
  it('should render follow button', () => {
    const { container } = render(<FollowButton userId="random" />);

    const button = getByText(container, /follow/i);
    expect(button).toBeInTheDocument();
  });
});
