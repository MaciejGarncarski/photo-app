import { render } from '@testing-library/react';

import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';

describe('IconWrapperX test', () => {
  it('renders correctly', () => {
    render(<IconXWrapper />);
    expect(document.querySelector('svg')?.classList).toHaveLength(2);
  });
  it('renders with size prop', () => {
    render(<IconXWrapper size="xl" />);
    expect(document.querySelector('svg')?.classList).toContain('xl');
    expect(document.querySelector('svg')?.classList).toHaveLength(1);
  });
});
