import { AspectRatioButtons } from '@/components/molecules/aspectRatioButtons/AspectRatioButtons';

import { fireEvent, render } from '@/tests';

describe('<AspectRatioButtons />', () => {
  it('should render heading', () => {
    const { getByRole } = render(<AspectRatioButtons setAspect={jest.fn()} aspect={1} />);

    const heading = getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Cropping orientation/i);
    expect(heading).toMatchSnapshot();
  });
  it('should run function on button click', async () => {
    const handleClick = jest.fn();
    const { findByText } = render(<AspectRatioButtons setAspect={handleClick} />);

    const squareButton = await findByText(/square/i);
    const portraitButton = await findByText(/portrait/i);
    const landscapeButton = await findByText(/landscape/i);
    fireEvent.click(squareButton);
    fireEvent.click(portraitButton);
    fireEvent.click(landscapeButton);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});
