import { Loading } from '@/components/atoms/loading/Loading';

import { render } from '@/tests';

describe('<Loading />', () => {
  it('should render default variant', () => {
    const { getByTestId } = render(<Loading />);

    const loading = getByTestId('loading');
    expect(loading).toBeInTheDocument();
    expect(loading).toMatchSnapshot();
  });

  it('should render small variant', () => {
    const { getByTestId } = render(<Loading variants={['small']} />);

    const loading = getByTestId('loading');
    expect(loading).toBeInTheDocument();
    expect(loading).toMatchSnapshot();
    expect(loading).toHaveClass('small');
  });

  it('should render center variant', () => {
    const { getByTestId } = render(<Loading variants={['center']} />);

    const loading = getByTestId('loading');
    expect(loading).toBeInTheDocument();
    expect(loading).toMatchSnapshot();
    expect(loading).toHaveClass('center');
  });

  it('should render multiple variants', () => {
    const { getByTestId } = render(<Loading variants={['center', 'very-small']} />);

    const loading = getByTestId('loading');
    expect(loading).toBeInTheDocument();
    expect(loading).toMatchSnapshot();
    expect(loading).toHaveClass('center', 'very-small');
  });
});
