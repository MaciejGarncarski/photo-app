import { fireEvent, render, screen } from '@testing-library/react';

import { DropZone } from '@/components/atoms/dropZone/DropZone';

const inactiveText = /drag photo here/i;
const activeText = /drop here/i;

describe('DropZone test', () => {
  it('renders correctly', () => {
    render(<DropZone error={null} onChange={jest.fn()} setError={jest.fn()} setImgSrc={jest.fn()} />);
    expect(screen.getByText(inactiveText)).toBeInTheDocument();
  });

  it('changes text when drag over', () => {
    render(<DropZone error={null} onChange={jest.fn()} setError={jest.fn()} setImgSrc={jest.fn()} />);
    const dropZone = screen.getByTestId(/dropZoneContainer/i);

    fireEvent.dragOver(dropZone);

    expect(dropZone).toHaveTextContent(activeText);
  });
  it('changes text when inactive', () => {
    render(<DropZone error={null} onChange={jest.fn()} setError={jest.fn()} setImgSrc={jest.fn()} />);
    const dropZone = screen.getByTestId(/dropZoneContainer/i);

    fireEvent.dragLeave(dropZone);

    expect(dropZone).toHaveTextContent(inactiveText);
  });
});
