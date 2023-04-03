import { fireEvent, render, screen } from '@testing-library/react';

import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';

describe('Backdrop test', () => {
  it('Should closeModal on escape click', () => {
    render(<div id="modal"></div>);
    const closeModal = jest.fn();

    render(
      <ModalBackdrop closeModal={closeModal}>
        <p>backdrop</p>
      </ModalBackdrop>,
    );

    const backdrop = screen.getByText(/backdrop/i);
    fireEvent.keyDown(backdrop, { key: 'Escape' });
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
