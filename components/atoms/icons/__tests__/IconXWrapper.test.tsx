import { render } from '@testing-library/react';

import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';

describe('IconWrapperX test', () => {
  it('renders correctly with size prop', () => {
    render(<IconXWrapper size="xl" />);

    expect(document.querySelector('svg')?.classList).toContain('xl');
    expect(document.querySelector('svg')?.classList).toHaveLength(1);
  });
  it('renders correctly without size prop', () => {
    render(<IconXWrapper />);

    expect(document.querySelector('svg')?.classList).toHaveLength(3);
  });
});
