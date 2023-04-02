import { fireEvent, render, screen } from '@testing-library/react';

import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';

describe('Backdrop test', () => {
  it('Should close on escape click', () => {
    render(<div id="modal"></div>);
    const close = jest.fn();

    render(
      <ModalBackdrop close={close}>
        <p>backdrop</p>
      </ModalBackdrop>,
    );

    const backdrop = screen.getByText(/backdrop/i);
    fireEvent.keyDown(backdrop, { key: 'Escape' });
    expect(close).toHaveBeenCalledTimes(1);
  });
});
