import { fireEvent, render, screen } from '@testing-library/react';

import { Backdrop } from '@/components/atoms/modal/Backdrop';

describe('Backdrop test', () => {
  it('Should render backdrop', () => {
    render(<div id="modal"></div>);
    render(
      <Backdrop close={jest.fn()}>
        <p>backdrop</p>
      </Backdrop>,
    );

    expect(screen.getByText(/backdrop/i)).toBeInTheDocument();
  });

  it('Should close on escape click', () => {
    render(<div id="modal"></div>);
    const close = jest.fn();

    render(
      <Backdrop close={close}>
        <p>backdrop</p>
      </Backdrop>,
    );

    const backdrop = screen.getByText(/backdrop/i);
    fireEvent.keyDown(backdrop, { key: 'Escape' });

    expect(close).toHaveBeenCalledTimes(1);
  });

  it('Should close on overlay click', () => {
    const close = jest.fn();
    render(<div id="modal"></div>);

    render(
      <Backdrop close={close}>
        <p>backdrop</p>
      </Backdrop>,
    );

    const backdrop = screen.getByTestId(/backdrop/i);
    fireEvent.click(backdrop);

    expect(close).toHaveBeenCalledTimes(1);
  });
});
