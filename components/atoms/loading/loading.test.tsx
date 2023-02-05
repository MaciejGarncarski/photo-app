import { getByTestId } from '@testing-library/react';

import { render } from '@/utils/tests/utils';

import { Loading } from '@/components/atoms/loading/Loading';

describe('Loading component test', () => {
  it('should render with proper className', () => {
    const { container } = render(<Loading variants={['small']} />);
    const loading = getByTestId(container, 'loading');
    expect(loading.classList).toContain('small');
  });
});
