import { DropZone } from '@/components/atoms/dropZone/DropZone';

import { fireEvent, render } from '@/tests/utils';

describe('<DropZone />', () => {
  it('should render component', async () => {
    const { findByTestId } = render(
      <DropZone setImgSrc={jest.fn()} onChange={jest.fn()} setError={jest.fn()} />
    );
    const dropZone = await findByTestId('drop-zone');

    fireEvent.click(dropZone);
    expect(dropZone).toBeInTheDocument();
  });

  it('should change state on drag over', async () => {
    const { findByTestId } = render(
      <DropZone setImgSrc={jest.fn()} onChange={jest.fn()} setError={jest.fn()} />
    );
    const dropZone = await findByTestId('drop-zone');
    fireEvent.dragOver(dropZone);

    expect(dropZone).toHaveTextContent(/Drop here 👌/i);
  });

  it('should change state on drag leave', async () => {
    const { findByTestId } = render(
      <DropZone setImgSrc={jest.fn()} onChange={jest.fn()} setError={jest.fn()} />
    );
    const dropZone = await findByTestId('drop-zone');
    fireEvent.dragLeave(dropZone);

    expect(dropZone).toHaveTextContent(/Drop or click to add image./i);
  });
});
