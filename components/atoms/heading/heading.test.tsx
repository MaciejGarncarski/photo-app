import { getByText } from '@testing-library/react';

import { render } from '@/utils/tests/utils';

import { Heading } from '@/components/atoms/heading/Heading';

describe('Heading component test', () => {
  it('Should render with proper tag', () => {
    const { container } = render(<Heading tag="h5">heading</Heading>);
    const heading = getByText(container, 'heading');
    expect(heading.tagName).toBe('H5');
  });
  it('Should render with variant', () => {
    const { container } = render(
      <Heading tag="h2" variant="center">
        heading
      </Heading>,
    );
    const heading = getByText(container, 'heading');
    expect(heading.classList).toContain('center');
  });
  it('Should render custom className', () => {
    const { container } = render(
      <Heading tag="h2" className="ImCustom">
        heading
      </Heading>,
    );
    const heading = getByText(container, 'heading');
    expect(heading.classList).toContain('ImCustom');
  });
});
