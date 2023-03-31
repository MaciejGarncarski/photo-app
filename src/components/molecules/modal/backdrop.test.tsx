import { fireEvent, render, screen } from '@testing-library/react';

import { Backdrop } from '@/components/molecules/modal/Backdrop';

describe('Backdrop test', () => {
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
});
